import React, { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../utils/useAuth";
import { useIsAuth } from "../../utils/useIsAuth";
import { WithSide } from "../../utils/withSide";
import Feed from "./components/Feed";
import { MessageAlert } from "./components/MessageAlert";

const Home = () => {
  const { errorFile } = useContext(UserContext);
  const router = useHistory();

  React.useEffect(() => {
    router.push("/home");
  });
  useIsAuth();

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
