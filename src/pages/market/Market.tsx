import React from "react";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../../components/Loading";
import {
  useCategoriesAndLocationsQuery,
  useProductsQuery,
} from "../../generated/graphql";
import { Bar } from "./components/Bar";
import { Collection } from "./components/Collection";
import { PopupAddProduct } from "./components/PopupAddProduct";
import { UserAccount } from "./components/UserAccount";
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
    return (
      <WrapLoading>
        <Loading blue />
      </WrapLoading>
    );
  }

  return (
    <Container>
      <Bar fc={() => setDisplay(!display)} />
      <Switch>
        <Route path="/market/you/selling">
          <UserAccount />
        </Route>
        <Route path="/">
          <Collection
            collection={products?.data}
            sortNumber={sort}
            loading={products?.loading}
          />
        </Route>
      </Switch>
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
  background-color: #f0f2f5;
  height: auto;
`;
const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;