import React from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useCategoriesAndLocationsQuery,
  useProductsQuery,
} from "../../generated/graphql";
import { Bar } from "./components/Bar";
import { Collection } from "./components/Collection";
import { PopupAddProduct } from "./components/PopupAddProduct";
interface MarketProps {}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Market: React.FC<MarketProps> = () => {
  const [display, setDisplay] = React.useState(false);
  const sort: any = useQuery().get("sort");
  const params: any = useParams();
  const { data, loading }: any = useCategoriesAndLocationsQuery();
  const products = useProductsQuery({
    variables: {
      category: params.slug,
      sort: parseInt(sort),
    },
  });

  if (!data && loading) {
    return null;
  }

  return (
    <Container>
      <Bar fc={() => setDisplay(!display)} />
      <Collection collection={products?.data} sortNumber={sort} />
      {display && (
        <PopupAddProduct fc={() => setDisplay(!display)} data={data} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
`;
