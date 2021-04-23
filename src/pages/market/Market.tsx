import React from "react";
import styled from "styled-components";
import { Bar } from "./components/Bar";
interface MarketProps {}

export const Market: React.FC<MarketProps> = () => {
  return (
    <Container>
      <Bar />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
`;
