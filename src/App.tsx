import { BrowserRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom";
import { CommentPost } from "./components/CommentPost";
import { FollowPopup } from "./components/FollowPopup";
import { PopupMore } from "./components/PopupMore";
import { Details } from "./pages/details/Details";
import Home from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/register/Register";
import "./styles/App.scss";
import { UserProvider } from "./utils/useAuth";

const App = () => {
  const routes = [
    { path: "/posts/:id", name: "Details", Component: Details },
    { path: "/register", name: "Register", Component: Register },
    { path: "/home", name: "Home", private: true, Component: Home },
    { path: "/login", name: "Login", Component: Login },
    { path: "/logout", name: "Login", Component: Login },
    { path: "/:username", name: "Profile", Component: Profile },
  ];

  return (
    <>
      <UserProvider>
        <Router>
          <PopupMore />
          <CommentPost/>
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
