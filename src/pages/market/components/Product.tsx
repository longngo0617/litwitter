import { Link } from "@material-ui/core";
import React from "react";
import { useRouteMatch } from "react-router";
import styled from "styled-components";

interface ProductProps {
  price: string;
  body: string;
  address: any;
  id:string;
  image: string[];
}

function currencyFormat(num: number) {
  return new Intl.NumberFormat("vn", { maximumSignificantDigits: 3 }).format(
    num
  );
}

export const Product: React.FC<ProductProps> = ({
  price,
  body,
  address,
  image,
  id
}) => {
  return (
    <Box>
      <Link href={`/market/item/${id}`} color="inherit">
        <Wrap>
          <ImageWrap>
            <Image src={image[0]}></Image>
          </ImageWrap>
          <InfoWrap>
            <MarginTop>
              <Price>{currencyFormat(parseInt(price))} đ</Price>
            </MarginTop>
            <MarginTop>
              <NameProduct>{body}</NameProduct>
            </MarginTop>
            <MarginTop>
              <Address>{address.location}</Address>
            </MarginTop>
          </InfoWrap>
        </Wrap>
      </Link>
    </Box>
  );
};

const Box = styled.div`
  max-width: 284px;
  min-width: 242px;
  padding-right: 4px;
  padding-left: 4px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageWrap = styled.div`
  width: 280px;
  height: 280px;
  position: relative;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const Image = styled.img`
  overflow: hidden;
  height: auto;
  width: 100%;
  object-fit: cover;
`;

const InfoWrap = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const MarginTop = styled.div`
  margin-top: 4px;
`;
const Price = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const NameProduct = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const Address = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #65676b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
