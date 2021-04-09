import React, { useContext } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import { WithSide } from "../../components/WithSide";
import { useIsAuth } from "../../utils/useIsAuth";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UserContext } from "../../utils/useAuth";
import { MainPage } from "./components/MainPage";
import { Following } from "./components/Following";
import { Follower } from "./components/Follower";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  useIsAuth();
  const router = useHistory();
  const {url} = useRouteMatch();
  const { user } = useContext(UserContext);
  return (
    <div className="wrapper">
      <WithSide>
        <div className="feed">
          <div className="feed__header">
            <ArrowBackIcon
              className="feed__header--icon"
              onClick={() => router.replace("/")}
            />
            <h2>{user.displayname}</h2>
          </div>
            <Switch>
                <Route path={`${url}`} exact component={MainPage}/>
                <Route path={`${url}/followers`} exact component={Follower}/>
                <Route path={`${url}/following`} exact component={Following}/>
            </Switch>
          
        </div>
      </WithSide>
    </div>
  );
};
