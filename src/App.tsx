import Home from "./pages/home/Home";
import "./styles/App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { UserProvider } from "./utils/useAuth";
import { Register } from "./pages/register/Register";

const App = () => {
  const routes = [
    { path: "/home", name: "Home", private: true, Component: Home },
    { path: "/register", name: "Register", Component: Register},
    { path: "/", name: "Login", Component: Login },
  ];

  return (
    <>
      <UserProvider>
        <Router>
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
