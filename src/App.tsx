import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { CommentPost } from "./components/CommentPost";
import { PopupMore } from "./components/PopupMore";
import { Connect } from "./pages/connect/Connect";
import { Detail } from "./pages/detailProduct/Detail";
import { Details } from "./pages/details/Details";
import { Groups } from "./pages/groups/Groups";
import Home from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Market } from "./pages/market/Market";
import { PopupMess } from "./pages/messages/components/PopupMess";
import { Messages } from "./pages/messages/Messages";
import { Notifications } from "./pages/notifications/Notifications";
import { PopupEdit } from "./pages/profile/components/PopupEdit";
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/register/Register";
import "./styles/App.scss";
import { UserProvider } from "./utils/useAuth";

const App = () => {
  const routes = [
    { path: "/users/:username", name: "Profile", Component: Profile },
    { path: "/posts/:id", name: "Details", Component: Details },
    { path: "/register", name: "Register", Component: Register },
    { path: "/login", name: "Login", Component: Login },
    { path: "/logout", name: "Logout", Component: Login },
    { path: "/home", name: "Home", Component: Home },
    { path: "/connect", name: "Connect Users", Component: Connect },
    { path: "/notifications", name: "Notifications", Component: Notifications },
    { path: "/groups", name: "Groups", Component: Groups },
    { path: "/market/category/:slug?", name: "Marketplace", Component: Market },
    {
      path: "/market/locations/:location?",
      name: "Marketplace",
      Component: Market,
    },
    { path: "/market/item/:id", name: "Marketplace", Component: Detail },
    { path: "/market", name: "Marketplace", Component: Market },
    { path: "/messages/:id", name: "Messages", Component: Messages },
    { path: "/messages", name: "Messages", Component: Messages },
    { path: "/", name: "Home", Component: Home },
  ];
  return (
    <>
      <UserProvider>
        <Router>
          <PopupMore />
          <CommentPost />
          <PopupEdit />
          <PopupMess />
          <Switch>
            {routes.map((e: any) => (
              <Route key={e.path} path={e.path}>
                <e.Component />
              </Route>
            ))}
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
