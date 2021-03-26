import React,{ useState } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import IconOption from "./IconOption";
interface InteractiveBarProps {
    commentCount?: number;
    likeCount?: number;
}

export const InteractiveBar: React.FC<InteractiveBarProps> = ({commentCount,likeCount}) => {
    const [backGround, setBackGround] = useState<
    "reply" | "retweet" | "like" | "share" | ""
  >("");
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
        Icon={FavoriteBorderIcon}
        color={"like"}
        object={likeCount}
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
    </>
  );
};
