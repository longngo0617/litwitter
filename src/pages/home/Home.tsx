import { WithSide } from "../../components/WithSide";
import { useIsAuth } from "../../utils/useIsAuth";
import Feed from "./components/Feed";

const Home = () => {
  useIsAuth();

  return (
    <div className="wrapper">
      <WithSide>
        <Feed />
      </WithSide>
    </div>
  );
};

export default Home;
