import React, { useContext } from "react";
import { WithSide } from "../../components/WithSide";
import { UserContext } from "../../utils/useAuth";
import { DetailsPost } from "./components/DetailsPost";
interface SinglePostProps {}

export const Details: React.FC<SinglePostProps> = () => {

  return (
    <div className="detailsPage">
      <WithSide>
        <DetailsPost />
      </WithSide>
    </div>
  );
};
