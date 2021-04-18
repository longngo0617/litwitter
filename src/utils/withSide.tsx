import React, { useContext } from "react";
import { Switch } from "react-router";
import { Route, useRouteMatch } from "react-router-dom";
import Sidebar from "../pages/home/components/Sidebar";
import Widgets from "../pages/home/components/Widgets";
import { UserContext } from "../utils/useAuth";
// import { CommentPost } from "./CommentPost";
// import { FollowPopup } from "./FollowPopup";

export const WithSide: React.FC<{}> = (props) => {
  const { user } = useContext(UserContext);

  return (
    <div className="wrapper">
      <Sidebar {...user} />
      {props.children}
      <Widgets />
    </div>
  );
};