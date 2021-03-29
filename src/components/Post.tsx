import { ApolloCache } from "@apollo/client";
import { Avatar, IconButton } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import gql from "graphql-tag";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Like,
  LikeMutation,
  PostSnippetFragment,
  useLikeMutation,
  useDeletePostMutation,
} from "../generated/graphql";
import { UserContext } from "../utils/useAuth";
import { Image } from "./Image";
import { InteractiveBar } from "./InteractiveBar";
import DeleteIcon from "@material-ui/icons/Delete";

export const Post: React.FC<PostSnippetFragment> = (props) => {
  const router = useHistory();
  const [likePost] = useLikeMutation();
  const { user } = useContext(UserContext);
  const [deletePost] = useDeletePostMutation();

  const updateAfterLike = (
    value: string,
    postId: string,
    cache: ApolloCache<LikeMutation>
  ) => {
    const data = cache.readFragment<{
      id: number;
      username: string;
      likes: [Like];
    }>({
      id: "Post:" + postId,
      fragment: gql`
        fragment _ on Post {
          id
          likes
        }
      `,
    });

    if (data) {
      cache.writeFragment({
        id: "Post:" + postId,
        fragment: gql`
          fragment __ on Post {
            likes
          }
        `,
        data: [...data.likes, value],
      });
    }
  };

  return (
    <>
      <div className="post">
        <div className="post__avatar">
          <Avatar src="" />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {props.displayname}
                <span className="post__headerSpecial">
                  {props.verified && (
                    <VerifiedUserIcon className="post__badge" />
                  )}
                  @{props.username}
                </span>
              </h3>
              {user.username === props.username ? (
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() => {
                    deletePost({
                      variables: { id: props.id },
                      update: (cache) => {
                        cache.evict({ id: "Post:" + props.id })
                      },
                    });
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              ) : null}
            </div>
            <div className="post__headerDescription">
              <p>{props.body}</p>
            </div>
          </div>
          {props?.image ? <Image image={props.image} /> : null}
          <div className="post__footer">
            <InteractiveBar
              commentCount={props.commentCount}
              likeCount={props.likeCount}
              likeList={props.likes}
              item={props}
              likePost={async () =>
                await likePost({
                  variables: { id: props.id },
                  update: (cache) =>
                    updateAfterLike(user.username, props.id, cache),
                })
              }
            />
          </div>
        </div>
      </div>
      {/* <CommentPost/> */}
    </>
  );
};
