
import React from "react";
import { useRouteMatch } from "react-router";
import { Route, Switch } from "react-router-dom";
import { FollowPopup } from "../../components/FollowPopup";
import { WithSide } from "../../utils/withSide";
import { DetailsPost } from "./components/DetailsPost";
interface SinglePostProps {}

export const Details: React.FC<SinglePostProps> = () => {
  const {url} = useRouteMatch();
  return (
    <WithSide>
      <DetailsPost />
      <Switch>
          <Route exact path={`${url}/comments`} render={() => <FollowPopup title="Commented"/>}/>
          <Route exact path={`${url}/likes`} render={() => <FollowPopup title="Liked"/>}/>
      </Switch>
    </WithSide>
  );
};
