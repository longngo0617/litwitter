import { ApolloCache } from "@apollo/client";
import { Avatar, IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import gql from "graphql-tag";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  PostSnippetFragment,
  useLikeMutation
} from "../generated/graphql";
import { UserContext } from "../utils/useAuth";
import { Image } from "./Image";
import { InteractiveBar } from "./InteractiveBar";

export const Post: React.FC<PostSnippetFragment> = (props) => {
  const router = useHistory();
  const [likePost] = useLikeMutation();
  const { user, openMore } = useContext(UserContext);

  return (
    <>
      <div
        className="post"
        onClick={() => router.replace(`/posts/${props.id}`)}
      >
        <div className="post__avatar">
          <Avatar src={props.avatar || ""} />
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
              <IconButton
                aria-label="more"
                onClick={(e) => {
                  e.stopPropagation();
                  openMore({
                      x: `${e.pageX}px`,
                      y: `${e.pageY}px`},
                    props
                  );
                }}
              >
                <MoreHorizIcon fontSize="small" />
              </IconButton>
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
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
