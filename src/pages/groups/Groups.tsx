import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import {
  useHistory,
  useRouteMatch,
  NavLink,
  Switch,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../utils/useAuth";
import Sidebar from "../home/components/Sidebar";
import { Widgets } from "./component/Widgets";
import { PopupCreateGroup } from "./component/PopupCreateGroup";
import { useTypeGroupQuery } from "../../generated/graphql";
import { DiscoverGroup } from "./component/DiscoverGroup";
import { FeedGroup } from "./component/FeedGroup";
import { Invite } from "./component/Invite";
import { useIsAuth } from "../../utils/useIsAuth";

interface GroupsProps {}

export const Groups: React.FC<GroupsProps> = (props) => {
  useIsAuth();
  const { user } = React.useContext(UserContext);
  const router = useHistory();
  const [open, setOpen] = React.useState(false);
  const typeGroup = useTypeGroupQuery();
  const { url } = useRouteMatch();
  React.useEffect(() => {
    router.push(`${url}/feed`);
  }, []);

  return (
    <div className="wrapper">
      <Sidebar {...user} />
      <Main style={{ flex: 0.6 }}>
        <div className="feed" style={{ flex: 1 }}>
          <div className="feed__header">
            <ArrowBackIcon
              className="feed__header--icon"
              onClick={() => router.goBack()}
            />
            <h2>Groups</h2>
          </div>
          <div className="profile__wrapper">
            <nav className="profile__nav">
              <div className="profile__nav--item">
                <NavLink
                  to={`${url}/feed`}
                  className="link"
                  activeClassName="active"
                >
                  <div className="link--title">
                    <span>Feed</span>
                  </div>
                </NavLink>
              </div>
              <div className="profile__nav--item">
                <NavLink to={`${url}/discover`} className="link">
                  <div className="link--title">
                    <span>Discover</span>
                  </div>
                </NavLink>
              </div>
              <div className="profile__nav--item">
                <NavLink to={`${url}/invite`} className="link">
                  <div className="link--title">
                    <span>Invite</span>
                  </div>
                </NavLink>
              </div>
            </nav>
          </div>
          <Switch>
            <Route path={`${url}/discover`}>
              <DiscoverGroup />
            </Route>
            <Route path={`${url}/invite`}>
              <Invite />
            </Route>
            <Route path={url}>
              <FeedGroup />
            </Route>
          </Switch>
        </div>
      </Main>
      <Widgets onOpen={() => setOpen(true)} />
      {open && (
        <PopupCreateGroup
          onClose={() => setOpen(false)}
          typeGroups={typeGroup.data?.getTypeGroup}
        />
      )}
    </div>
  );
};
const Main = styled.div`
  flex-shrink: 1;
  flex: 1;
  user-select: text;
  display: flex;
`;
