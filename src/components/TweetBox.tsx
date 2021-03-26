import { Avatar, Box, Button } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useCreatePostMutation } from "../generated/graphql";
import { Image } from "./Image";
import { Loading } from "./Loading";
import { TextArea } from "./TextFormField";

interface TweetBoxProps {}

export const TweetBox: React.FC<TweetBoxProps> = () => {
  const [createPost] = useCreatePostMutation();
  const inputFile: any = useRef(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState<any>("");

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(e.target.value);
  };

  const previewFile = (file: any) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const cancelFile = () => {
    setPreviewSource("");
    setSelectedFile("");
  };

  return (
    <div className="tweetBox">
      <div className="tweetBox__avatar">
        <Avatar src="" />
      </div>
      <div className="tweetBox__form">
        <Formik
          initialValues={{ body: "", image: "" }}
          onSubmit={async (values) => {
            values.image = previewSource as string;
            await createPost({
              variables: values,
              update: (cache) => {
                cache.evict({ fieldName: "getPosts:{}" });
              },
            });
            setPreviewSource("");
            values.body = "";
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="body" component={TextArea}/>
              <div className="tweetBox__input">
                <div className="tweetBox__imagePreview">
                  {previewSource ? (
                    <Image image={previewSource} close callback={cancelFile} />
                  ) : null}
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
                      <InsertPhotoIcon
                        className="icon"
                        onClick={() => inputFile.current.click()}
                      />
                      <input
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        multiple
                        type="file"
                        className="input-file"
                        ref={inputFile}
                        value={selectedFile}
                        onChange={handleFileInputChange}
                      />
                    </div>
                  </div>
                  <div className="icon--wrap">
                    <div className="icon--item">
                      <InsertEmoticonIcon className="icon" />
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
