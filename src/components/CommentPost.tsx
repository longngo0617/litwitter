import React, { useContext } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar } from "@material-ui/core";
import { TweetBox } from "./TweetBox";
import { UserContext } from "../utils/useAuth";
interface CommentPostProps {}

export const CommentPost: React.FC<CommentPostProps> = () => {
  const { commentState, closeComment, commentItem } = useContext(UserContext);

  if (!commentState) {
    return null;
  }

  return ReactDOM.createPortal(
      <div className="box">
        <div className="overlay"></div>
        <div className="model-header">
          <div className="box__comment">
            <div className="box__comment--top">
              <div className="box__comment--close" onClick={closeComment}>
                <CloseIcon style={{ color: "#50b7f5" }} />
              </div>
            </div>
            <div className="box__comment--body">
              <div className="box__comment--content">
                <div className="avartar">
                  <Avatar src={commentItem?.avatar} style={{ marginBottom: "10px" }} />
                  <div className="bar">
                    <p></p>
                  </div>
                </div>
                <div className="info">
                  <div className="info__top">
                    <span className="info__top--name">
                      {commentItem?.displayname}
                    </span>
                    <span className="info__top--username">
                      @{commentItem?.username}
                    </span>
                  </div>
                  <div className="info__bot">
                    <span className="content">{commentItem?.body}</span>
                  </div>
                </div>
              </div>
              <div className="box__reply">
                <div className="bar" style={{ marginRight: "12px" }}>
                  <p></p>
                </div>
                <div className="reply">
                  Trả lời
                  <span>@{commentItem?.username}</span>
                </div>
              </div>
              <TweetBox isComment postId={commentItem?.id} />
            </div>
          </div>
        </div>
      </div>,
    document.getElementById("react-root") as HTMLElement
  );
};
