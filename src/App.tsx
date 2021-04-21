import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CommentPost } from "./components/CommentPost";
import { PopupMore } from "./components/PopupMore";
import { Details } from "./pages/details/Details";
import Home from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { PopupMess } from "./pages/messages/components/PopupMess";
import { Messages } from "./pages/messages/Messages";
import { PopupEdit } from "./pages/profile/components/PopupEdit";
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/register/Register";
import "./styles/App.scss";
import { UserContext, UserProvider } from "./utils/useAuth";

const App = () => {
  const routes = [
    { path: "/users/:username", name: "Profile", Component: Profile },
    { path: "/posts/:id", name: "Details", Component: Details },
    { path: "/register", name: "Register", Component: Register },
    { path: "/login", name: "Login", Component: Login },
    { path: "/logout", name: "Logout", Component: Login },
    { path: "/home", name: "Home", Component: Home },
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
          <PopupEdit/>
          <PopupMess/>
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
