import React, { useContext } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import { WithSide } from "../../components/WithSide";
import { useIsAuth } from "../../utils/useIsAuth";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UserContext } from "../../utils/useAuth";
import { MainPage } from "./components/MainPage";
import { Following } from "./components/Following";
import { Follower } from "./components/Follower";
import { useUserQuery } from "../../generated/graphql";
import { Loading } from "../../components/Loading";
import { Box } from "@material-ui/core";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  useIsAuth();
  const router = useHistory();
  const { url, params }: any = useRouteMatch();
  const { user } = useContext(UserContext);
  const { data, error, loading, variables } = useUserQuery({
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
    <div className="wrapper">
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
                  onClick={() => router.replace("/")}
                />
                <h2>{data?.getUser?.displayname}</h2>
              </div>
              <Switch>
                <Route
                  path={`${url}`}
                  exact
                  render={() => <MainPage {...data} />}
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
    </div>
  );
};
