import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widgets from "./components/Widgets";
import { useIsAuth } from "../../utils/useIsAuth";

const Home = () => {
  useIsAuth();
  return (
    <div className="homepage">
      <Sidebar />
      <Feed/>
      <Widgets/>
    </div>
  );
};

export default Home;
