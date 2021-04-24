import React from "react";
import styled from "styled-components";
import { Bar } from "./components/Bar";
import { Collection } from "./components/Collection";
interface MarketProps {}

export const Market: React.FC<MarketProps> = () => {
  return (
    <Container>
      <Bar />
      <Collection />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
`;
