import React from "react";
import styled from "styled-components";
import { Bar } from "./components/Bar";
import { Collection } from "./components/Collection";
import { PopupAddProduct } from "./components/PopupAddProduct";
interface MarketProps {}

export const Market: React.FC<MarketProps> = () => {
  const [display, setDisplay] = React.useState(false);
  return (
    <Container>
      <Bar fc={() => setDisplay(!display)} />
      <Collection />
      {display && <PopupAddProduct fc={() => setDisplay(!display)} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
`;
