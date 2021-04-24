import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useProductsQuery } from "../../../generated/graphql";
import { Product } from "./Product";

interface CollectionProps {}

export const Collection: React.FC<CollectionProps> = () => {
  const { data, loading }: any = useProductsQuery();
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  if (!data && loading) {
    return null;
  }
  return (
    <Container>
      <Main>
        <Wrap>
          <Header>
            <Title>Lựa chọn hôm nay</Title>
            <BarFilter>
              <Group
                aria-label="price"
                name="price1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="decrease"
                  control={<Radio />}
                  label="Giá từ cao xuống thấp"
                />
                <FormControlLabel
                  value="increase"
                  control={<Radio />}
                  label="Giá từ thấp đến cao"
                />
              </Group>
            </BarFilter>
          </Header>
          <ListProduct>
            {data?.getProducts.map((product: any) => (
              <Product {...product} />
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
