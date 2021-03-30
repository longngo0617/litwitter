import { Avatar, IconButton } from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { formatDate } from "../../../utils/toErrorMap";
import { UserContext } from "../../../utils/useAuth";

interface CommentProps {
  username?: string;
  body?: string;
  displayname?:string,
  createdAt?: string;
  postOwner?: string;
}

export const Comment: React.FC<CommentProps> = ({
  username,
  displayname,
  body,
  createdAt,
  postOwner,
}) => {
  const { user } = useContext(UserContext);
  const checkUser = user.username === postOwner || user.username === username;
  return (
    <div className="comment__wrap">
      <div className="comment__box">
        <div className="comment__box--left">
          <Avatar src="" />
        </div>
        <div className="comment__box--right">
          <div className="comment__box--name">
            <div className="name">
              <Link to="">
                <div className="fullname">{displayname}</div>
                <div className="username">@{username}</div>
              </Link>
              <span className="dot">.</span>
              <span className="day">{formatDate(createdAt)}</span>
            </div>
            {checkUser ? (
              <IconButton aria-label="button delete comment" style={{padding:"0px"}}>
                <MoreHorizIcon fontSize="small"/>
              </IconButton>
            ) : null}
          </div>
          <div className="comment__box--content">{body}</div>
        </div>
      </div>
    </div>
  );
};
