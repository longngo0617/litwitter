import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import IconOption from "./IconOption";

interface PostProps {
  displayName: string;
  username: string;
  verified: boolean;
  text: string;
  image: string;
  avatar: string;
  date: string;
  likes: number;
  tweets: number;
}

export const Post: React.FC<PostProps> = ({
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  date,
  likes,
  tweets,
}) => {
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
              {displayName}
              <span className="post__headerSpecial">
                {verified && <VerifiedUserIcon className="post__badge" />}@
                {username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{text}</p>
          </div>
        </div>
        <div className="post__image--wrap">
          <div className="post__image--wrap">
            <div className="post__image--wrap post__image">
              <div className="post__image--wrap">
                <a href="#" className="post__image--wrap post__image--link">
                  <div className="post__image--wrap overflow">
                    <div
                      className="full-width block"
                      style={{ paddingBottom: "56.25%" }}
                    ></div>
                    <div className="post__image--body">
                      <div
                        className="post__image--big"
                        style={{ marginBottom: "-21%" }}
                      >
                        <div
                          className="post__image--background"
                          style={{ backgroundImage: `url(${image})` }}
                        ></div>
                        <img src={image} alt="" className="post__image--hide" />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="post__date">
          <span>{date}</span>
        </div> */}
        <div className="post__footer">
          <IconOption
            background={backGround}
            Icon={ChatBubbleOutlineIcon}
            color={"reply"}
            object={"12"}
            mouseEnter={() => setBackGround("reply")}
            mouseLeave={() => setBackGround("")}
          />
          <IconOption
            background={backGround}
            Icon={RepeatIcon}
            color={"retweet"}
            object={tweets}
            mouseEnter={() => setBackGround("retweet")}
            mouseLeave={() => setBackGround("")}
          />
          <IconOption
            background={backGround}
            Icon={FavoriteBorderIcon}
            color={"like"}
            object={likes}
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
