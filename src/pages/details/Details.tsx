import React from "react";
import { WithSide } from "../../utils/withSide";
import { DetailsPost } from "./components/DetailsPost";
interface SinglePostProps {}

export const Details: React.FC<SinglePostProps> = () => {
  return (
    <WithSide>
      <DetailsPost />
    </WithSide>
  );
};
