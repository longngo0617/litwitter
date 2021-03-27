import React, { useContext, useState } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PublishIcon from "@material-ui/icons/Publish";
import IconOption from "./IconOption";
import { UserContext } from "../utils/useAuth";
interface InteractiveBarProps {
  commentCount?: number;
  likeCount?: number;
  likePost?: () => void;
  likeList?: any;
}

export const InteractiveBar: React.FC<InteractiveBarProps> = ({
  commentCount,
  likeCount,
  likePost,
  likeList,
}) => {
  const [backGround, setBackGround] = useState<
    "reply" | "retweet" | "like" | "share" | ""
  >("");
  const { user } = useContext(UserContext);
  let favorite = likeList.find((like: any) => like.username === user.username);
  const IconFavorite = () => {
    return (
      <FavoriteIcon
        fontSize="small"
        className="post__footer--icon"
        style={{ color: "#e0245e" }}
      />
    );
  };
  return (
    <>
      <IconOption
        background={backGround}
        Icon={ChatBubbleOutlineIcon}
        color={"reply"}
        object={commentCount}
        mouseEnter={() => setBackGround("reply")}
        mouseLeave={() => setBackGround("")}
      />
      <IconOption
        background={backGround}
        Icon={RepeatIcon}
        color={"retweet"}
        object={commentCount}
        mouseEnter={() => setBackGround("retweet")}
        mouseLeave={() => setBackGround("")}
      />
      <IconOption
        background={backGround}
        Icon={favorite ? IconFavorite : FavoriteBorderIcon}
        color={"like"}
        object={likeCount}
        mouseEnter={() => setBackGround("like")}
        mouseLeave={() => setBackGround("")}
        mouseClick={likePost}
      />
      <IconOption
        background={backGround}
        Icon={PublishIcon}
        color={"share"}
        mouseEnter={() => setBackGround("share")}
        mouseLeave={() => setBackGround("")}
      />
    </>
  );
};
