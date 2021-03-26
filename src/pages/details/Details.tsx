import React, { useContext } from "react";
import { UserContext } from "../../utils/useAuth";
import Sidebar from "../home/components/Sidebar";
import Widgets from "../home/components/Widgets";
import { DetailsPost } from "./components/DetailsPost";
interface SinglePostProps {}

export const Details: React.FC<SinglePostProps> = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="detailsPage">
      <Sidebar username={user.username} displayname={user.displayname} />
      <DetailsPost />
      <Widgets />
    </div>
  );
};
