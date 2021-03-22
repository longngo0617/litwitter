import React from "react";
import { Avatar, Button } from "@material-ui/core";

interface TweetBoxProps {

}

export const TweetBox: React.FC<TweetBoxProps> = ({}) => {
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="" />
          <input
            type="text"
            name="body"
            placeholder="What's happening"
          />
        </div>
        <input
          type="text"
          placeholder="Enter image URL"
          className="tweetBox__imageInput"
        />
        <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
      </form>
    </div>
  );
}
