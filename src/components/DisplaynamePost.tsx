import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import styled from "styled-components";

interface DisplaynamePostProps {
  name: string;
}

export const DisplaynamePost: React.FC<DisplaynamePostProps> = ({ name }) => {
  const displayname = name.split(",");
  return (
    <Name>
      {displayname[0]}
      <span style={{ display: "inline-block", verticalAlign: "-0.25em" }}>
        <Icon />
      </span>
      {displayname[1]}
    </Name>
  );
};

const Name = styled.span`
  display: block;
`;

const Icon = styled(PlayArrowIcon)`
  width: 16px;
  height: 16px;
  color: #606770;
`;
