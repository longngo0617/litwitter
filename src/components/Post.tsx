import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import React from "react";
import { useHistory } from "react-router-dom";
import { PostSnippetFragment } from "../generated/graphql";
import { Image } from "./Image";
import { InteractiveBar } from "./InteractiveBar";

export const Post: React.FC<PostSnippetFragment> = (props) => {
  const router = useHistory();
  return (
    <div className="post" onClick={() => router.replace(`/posts/${props.id}`)}>
      <div className="post__avatar">
        <Avatar src="" />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {props.displayname}
              <span className="post__headerSpecial">
                {props.verified && <VerifiedUserIcon className="post__badge" />}@
                {props.username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{props.body}</p>
          </div>
        </div>
        {props?.image ? <Image image={props.image}/> : null}
        {/* <div className="post__date">
          <span>{date}</span>
        </div> */}
        <div className="post__footer">
            <InteractiveBar commentCount={props.commentCount} likeCount={props.likeCount}/>
        </div>
      </div>
    </div>
  );
};
