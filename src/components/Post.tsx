import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import IconOption from "./IconOption";
import {PostSnippetFragment} from "../generated/graphql";
import { getNullableType, isNullableType } from "graphql";
import { Image } from "./Image";


export const Post: React.FC<PostSnippetFragment> = (props) => {
  const [backGround, setBackGround] = useState<
    "reply" | "retweet" | "like" | "share" | ""
  >("");

  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src="" />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {/* {props.displayname} */}
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
          <IconOption
            background={backGround}
            Icon={ChatBubbleOutlineIcon}
            color={"reply"}
            object={props.commentCount}
            mouseEnter={() => setBackGround("reply")}
            mouseLeave={() => setBackGround("")}
          />
          <IconOption
            background={backGround}
            Icon={RepeatIcon}
            color={"retweet"}
            object={props.commentCount}
            mouseEnter={() => setBackGround("retweet")}
            mouseLeave={() => setBackGround("")}
          />
          <IconOption
            background={backGround}
            Icon={FavoriteBorderIcon}
            color={"like"}
            object={props.likeCount}
            mouseEnter={() => setBackGround("like")}
            mouseLeave={() => setBackGround("")}
          />
          <IconOption
            background={backGround}
            Icon={PublishIcon}
            color={"share"}
            mouseEnter={() => setBackGround("share")}
            mouseLeave={() => setBackGround("")}
          />
        </div>
      </div>
    </div>
  );
};
