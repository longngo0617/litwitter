import { Avatar, IconButton } from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { formatDate } from "../../../utils/toErrorMap";
import { UserContext } from "../../../utils/useAuth";

interface CommentProps {
  username?: string;
  body?: string;
  displayname?: string;
  createdAt?: string;
  postOwner?: string;
  avatar?: string;
}

export const Comment: React.FC<CommentProps> = ({
  username,
  displayname,
  body,
  createdAt,
  postOwner,
  avatar,
}) => {
  const { user, openMore } = useContext(UserContext);
  return (
    <div className="comment__wrap">
      <div className="comment__box">
        <div className="comment__box--left">
          <Avatar src={avatar || ""} />
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
            <IconButton
              aria-label="button delete comment"
              style={{ padding: "0px" }}
              onClick={(e) => {
                e.stopPropagation();
                openMore(
                  {
                    x: `${e.pageX}px`,
                    y: `${e.pageY}px`,
                  },
                  {
                    displayname,
                    username,
                  }
                );
              }}
            >
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </div>
          <div className="comment__box--content">{body}</div>
        </div>
      </div>
    </div>
  );
};
