import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Product } from "./Product";

interface CollectionProps {
  collection: any;
  sortNumber:string;
}

export const Collection: React.FC<CollectionProps> = ({collection,sortNumber}) => {
  const router = useHistory();

  return (
    <Container>
      <Main>
        <Wrap>
          <Header>
            <Title>Lựa chọn hôm nay</Title>
            <BarFilter>
              <div>
                <FormControlLabel
                  value="decrease"
                  control={<Radio />}
                  checked={sortNumber === "-1"}
                  onChange={() => {
                    router.push({
                      search: "?sort=-1",
                    });
                  }}
                  label="Giá từ cao xuống thấp"
                />
                <FormControlLabel
                  value="increase"
                  control={<Radio />}
                  checked={sortNumber === "1"}
                  onChange={() => {
                    router.push({
                      search: "?sort=1",
                    });
                  }}
                  label="Giá từ thấp đến cao"
                />
              </div>
            </BarFilter>
          </Header>
          <ListProduct>
            {collection?.getProducts.map((product: any) => (
              <Product key={product.id} {...product} />
            ))}
          </ListProduct>
        </Wrap>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  max-width: 100%;
  flex-shrink: 1;
  flex-grow: 1;
  background-color: #f0f2f5;
  box-sizing: border-box;
  height: 100%;
  flex-direction: column;
`;
const Main = styled.div`
  padding-left: 26px;
  padding-right: 26px;
`;
const Wrap = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-right: 20px;
`;
const Title = styled.h2`
  font-size: 20px;
  font-weight: 800;
  line-height: 24px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const BarFilter = styled.div`
  display: flex;
`;
const Group = styled(RadioGroup)`
  flex-direction: row !important;
`;

const ListProduct = styled.div`
  margin: 15px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
