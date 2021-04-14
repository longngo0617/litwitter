import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CommentPost } from "./components/CommentPost";
import { FollowPopup } from "./components/FollowPopup";
import { PopupMore } from "./components/PopupMore";
import { Details } from "./pages/details/Details";
import Sidebar from "./pages/home/components/Sidebar";
import Widgets from "./pages/home/components/Widgets";
import Home from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/register/Register";
import "./styles/App.scss";
import { UserContext, UserProvider } from "./utils/useAuth";

const App = () => {
  const routes = [
    {
      path: "/posts/:id/comments",
      name: "PopupComment",
      Component: FollowPopup,
      title: "Commented",
    },
    {
      path: "/posts/:id/likes",
      name: "PopupLike",
      Component: FollowPopup,
      title: "Liked",
    },
    { path: "/posts/:id", name: "Details", Component: Details },
    { path: "/register", name: "Register", Component: Register },
    { path: "/login", name: "Login", Component: Login },
    { path: "/logout", name: "Logout", Component: Login },
    { path: "/home", name: "Home", Component: Home },
    { path: "/:username", name: "Profile", Component: Profile },
  ];
  const { user } = useContext(UserContext);
  return (
    <>
      <UserProvider>
        <Router>
          <PopupMore />
          <CommentPost />
          <Switch>
            {routes.map((e: any) => (
              <Route key={e.path} path={e.path}>
                {e.title ? <e.Component title={e.title} /> : <e.Component />}
              </Route>
            ))}
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
