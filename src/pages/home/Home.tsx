import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widgets from "./components/Widgets";
import { useIsAuth } from "../../utils/useIsAuth";
import { UserContext } from "../../utils/useAuth";
import { useContext } from "react";

const Home = () => {
  useIsAuth();
  const {user} = useContext(UserContext);
  
  return (
    <div className="homepage">
      <Sidebar {...user}/>
      <Feed/>
      <Widgets/>
    </div>
  );
};

export default Home;
