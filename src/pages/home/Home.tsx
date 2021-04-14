import React from "react";
import { useIsAuth } from "../../utils/useIsAuth";
import { WithSide } from "../../utils/withSide";
import Feed from "./components/Feed";

const Home = () => {
  useIsAuth();

  return (
    <WithSide>
      <Feed />
    </WithSide>
  );
};

export default Home;
