import React, { useContext } from "react";
import { UserContext } from "../../utils/useAuth";
import { useIsAuth } from "../../utils/useIsAuth";
import { WithSide } from "../../utils/withSide";
import Feed from "./components/Feed";
import { MessageAlert } from "./components/MessageAlert";

const Home = () => {
  useIsAuth();
  const { errorFile } = useContext(UserContext);
  
  return (
    <>
      <WithSide>
        <Feed />
      </WithSide>
      {errorFile && <MessageAlert />}
    </>
  );
};

export default Home;
