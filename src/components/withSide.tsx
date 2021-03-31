import React, { useContext } from "react";
import Sidebar from "../pages/home/components/Sidebar";
import Widgets from "../pages/home/components/Widgets";
import { UserContext } from "../utils/useAuth";

interface withSideProps {
}

export const withSide: React.FC<{}> = (children) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Sidebar {...user} />
      {children}
      <Widgets />
    </>
  );
};
