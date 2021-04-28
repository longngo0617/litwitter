import { Box } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  useLocation,
} from "react-router";
import { Loading } from "../../components/Loading";
import { useUserQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/useIsAuth";
import { Follower } from "./components/Follower";
import { Following } from "./components/Following";
import { MainPage } from "./components/MainPage";
import { WithSide } from "../../utils/withSide";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  useIsAuth();
  const router = useHistory();
  let location = useLocation();
  const { url, params }: any = useRouteMatch();
  const { data, error, loading } = useUserQuery({
    variables: {
      username: params.username,
    },
  });


  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <WithSide>
      <div className="feed">
        {!data && loading ? (
          <Box display="flex" justifyContent="center" marginTop="20px">
            <Loading blue />
          </Box>
        ) : (
          <>
            <div className="feed__header">
              <ArrowBackIcon
                className="feed__header--icon"
                onClick={() => router.goBack()}
              />
              <h2>{data?.getUser?.displayname}</h2>
            </div>
            <Switch>
              <Route
                path={`${url}`}
                exact
                render={() => <MainPage dataUser={data} params={params} />}
              />
              <Route
                path={`${url}/followers`}
                exact
                render={() => <Follower props={data?.getUser} />}
              />
              <Route
                path={`${url}/following`}
                exact
                render={() => <Following props={data?.getUser} />}
              />
            </Switch>
          </>
        )}
      </div>
    </WithSide>
  );
};
