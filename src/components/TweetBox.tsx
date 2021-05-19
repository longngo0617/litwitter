import { Avatar, Box, Button, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import { Field, Form, Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import {
  useCreatePostMutation,
  useCommentMutation,
  useCreatePostInGroupMutation,
  useCreateCommentInGroupMutation,
} from "../generated/graphql";
import { UserContext } from "../utils/useAuth";
import { Image } from "./Image";
import { Loading } from "./Loading";
import { TextArea } from "./TextFormField";

interface TweetBoxProps {
  isComment?: boolean;
  isGroup?: boolean;
  postId?: string;
  groupId?: string;
  isCommentInGroup?: boolean;
}

export const TweetBox: React.FC<TweetBoxProps> = ({
  isComment,
  postId,
  isGroup,
  groupId,
  isCommentInGroup,
}) => {
  const [createPost] = useCreatePostMutation();
  const [createComment] = useCommentMutation();
  const [createPostInGroup] = useCreatePostInGroupMutation();
  const [createCommentInGroup] = useCreateCommentInGroupMutation();
  const { closeComment, user } = useContext(UserContext);
  const inputFile: any = useRef(null);
  const { addImage, arrImage, openErrorFile, closeErrorFile,resetImage } = useContext(
    UserContext
  );

  const handleFileInputChange = (e: any) => {
    if (e.target.files.length > 4) {
      openErrorFile();
      const timeId = setTimeout(() => {
        closeErrorFile();
      }, 3000);

      return () => {
        clearTimeout(timeId);
      };
    } else {
      Array.from(e.target.files).map((file) => readerImage(file));
    }
  };

  const readerImage = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      addImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="tweetBox">
      <div className="tweetBox__avatar">
        <Avatar src={user.profile?.avatar || ""} />
      </div>
      <div className="tweetBox__form">
        <Formik
          initialValues={{ body: "", image: [""] }}
          onSubmit={async (values) => {
            values.image = arrImage;
            if (isGroup) {
              await createPostInGroup({
                variables: {
                  ...values,
                  groupId: groupId as string,
                },
                update: (cache) => {
                  cache.evict({ id: "Group:" + groupId });
                },
              });
            } else if (isCommentInGroup && groupId) {
              await createCommentInGroup({
                variables: {
                  groupId: groupId as string,
                  postId: postId as string,
                  body: values.body,
                },
                update: (cache) => {
                  cache.evict({ id: "Group:" + groupId });
                  closeComment();
                },
              });
            } else if (isComment) {
              await createComment({
                variables: { id: postId as string, body: values.body },
                update: () => {
                  closeComment();
                },
              });
            } else {
              await createPost({
                variables: values,
                update: (cache) => {
                  cache.evict({ fieldName: "getPosts:{}" });
                },
              });
            }
            values.body = "";
            resetImage();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="body" component={TextArea} />
              <div className="tweetBox__input">
                <div className="tweetBox__imagePreview">
                  {arrImage.length ? <Image image={arrImage} close /> : null}
                </div>
              </div>
              <Box
                display="flex"
                className="tweetBox__bar"
                alignItems="center"
                justifyContent="space-between"
              >
                <div className="tweetBox__bar--icon">
                  <div className="icon--wrap">
                    <div className="icon--item">
                      <IconButton
                        aria-label="insert photo"
                        color="primary"
                        onClick={() => inputFile.current.click()}
                      >
                        <InsertPhotoIcon className="icon" />
                      </IconButton>
                      <input
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        multiple
                        type="file"
                        className="input-file"
                        ref={inputFile}
                        onChange={handleFileInputChange}
                      />
                    </div>
                  </div>
                  <div className="icon--wrap">
                    <div className="icon--item">
                      <IconButton aria-label="insert emoji" color="primary">
                        <InsertEmoticonIcon className="icon" />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className="tweetBox__bar--button">
                  <Button className="tweetBox__tweetButton" type="submit">
                    {isSubmitting ? <Loading /> : "Tweet"}
                  </Button>
                </div>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
