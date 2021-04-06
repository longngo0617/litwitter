import React from "react";
import { WithSide } from "../../components/WithSide";
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
