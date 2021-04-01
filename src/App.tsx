import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CommentPost } from "./components/CommentPost";
import { PopupMore } from "./components/PopupMore";
import { Details } from "./pages/details/Details";
import Home from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import "./styles/App.scss";
import { UserProvider } from "./utils/useAuth";

const App = () => {
  const routes = [
    { path: "/home", name: "Home", private: true, Component: Home },
    { path: "/posts/:id", name: "Details", Component: Details },
    { path: "/register", name: "Register", Component: Register },
    { path: "/", name: "Login", Component: Login },
  ];
  

  return (
    <>
      <UserProvider>
        <Router>
          <CommentPost />
          <PopupMore />
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
