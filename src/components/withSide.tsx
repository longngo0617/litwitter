import React, { useContext } from "react";
import Sidebar from "../pages/home/components/Sidebar";
import Widgets from "../pages/home/components/Widgets";
import { UserContext } from "../utils/useAuth";


export const WithSide: React.FC<{}> = (props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Sidebar {...user} />
      {props.children}
      <Widgets />
    </>
  );
};
