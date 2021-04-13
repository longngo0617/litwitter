import React, { useContext } from "react";
import { Switch } from "react-router";
import { Route, useRouteMatch } from "react-router-dom";
import Sidebar from "../pages/home/components/Sidebar";
import Widgets from "../pages/home/components/Widgets";
import { UserContext } from "../utils/useAuth";
import { CommentPost } from "./CommentPost";
import { FollowPopup } from "./FollowPopup";


export const WithSide: React.FC<{}> = (props) => {
  const { user } = useContext(UserContext);
  let {url} = useRouteMatch();
  
  return (
    <>
      <Sidebar {...user} />
      {props.children}
      <Widgets />
      <Switch>
        <Route path={`${url}/comments`} exact render={() => <FollowPopup title={"Commented"}/>}/>
        <Route path={`${url}/likes`} exact render={() => <FollowPopup title={"Liked"}/>}/>
      </Switch>
    </>
  );
};
