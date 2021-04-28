import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useProductQuery } from "../../generated/graphql";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
interface DetailProps {}

function currencyFormat(num: number) {
  return new Intl.NumberFormat("vn", { maximumSignificantDigits: 3 }).format(
    num
  );
}

export const Detail: React.FC<DetailProps> = () => {
  const [crIndex, SetCrIndex] = useState<number>(0);
  const params: any = useParams();
  const router = useHistory();
  const { data, loading }: any = useProductQuery({
    variables: {
      id: params.id,
    },
  });
  let imageLength = 0;

  if (data) {
    imageLength = data.getProduct.image.length;
  }

  if (!data && loading) {
    return null;
  }

  return (
    <Wrap>
      <Left>
        <Overlay
          style={{
            backgroundImage: `url(${data?.getProduct?.image[crIndex]})`,
          }}
        />
        <Main>
          <CloseButton>
            <CloseIcon style={{ color: "#fff" }} />
          </CloseButton>
          <PrevButton
            onClick={() => {
              if (crIndex - 1 < 0) {
                SetCrIndex(imageLength - 1);
              } else {
                SetCrIndex(crIndex - 1);
              }
            }}
          >
            <NavigateBeforeIcon />
          </PrevButton>
          <NextButton
            onClick={() => {
              if (crIndex + 1 > imageLength - 1) {
                SetCrIndex(0);
              } else {
                SetCrIndex(crIndex + 1);
              }
            }}
          >
            <NavigateNextIcon />
          </NextButton>
          <ImageMain>
            <Img src={data?.getProduct?.image[crIndex]} alt="" />
          </ImageMain>
          <ListImage>
            {data?.getProduct?.image.map((image: string, index: number) => (
              <BorderImg
                key={index}
                className={`${crIndex === index ? "activeImage" : ""}`}
              >
                <Img src={image} />
              </BorderImg>
            ))}
          </ListImage>
        </Main>
      </Left>
      <Right>
        <NoiDung>
          <Title>{data?.getProduct?.body}</Title>
          <Price>{currencyFormat(parseInt(data?.getProduct?.price))} đ</Price>
          <HangMuc>{data?.getProduct.category.name}</HangMuc>
          <DiaDiem>{data?.getProduct.address.location}</DiaDiem>
          <WrapButton>
            <SendButton variant="contained" startIcon={<SendIcon />}>
              Nhắn tin
            </SendButton>
          </WrapButton>
          <Mota>
            <Price>Mô tả của người bán</Price>
            <Content>{data?.getProduct.describe}</Content>
          </Mota>
        </NoiDung>
        <InfoUser>
          <Price>Thông tin về người bán</Price>
          <div className="follow-modal-bottom-itemWrap">
            <div
              className="follow-modal-bottom-item"
              onClick={() => router.replace(`/users/${data?.getProduct.seller.username}`)}
            >
              <div className="item">
                <div className="item-left">
                  <div className="avatar">
                    <Avatar src={data?.getProduct.seller.profile.avatar || ""} />
                  </div>
                </div>
                <div className="item-right">
                  <div className="item-right-top">
                    <div className="item-right-top-text">
                      <div className="name-wrap">
                        <div className="name">
                          <span>{data?.getProduct.seller.displayname}</span>
                        </div>
                        <div className="username">
                          <span>@{data?.getProduct.seller.username}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </InfoUser>
      </Right>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: stretch;
  z-index: 3;
  overflow: hidden;
`;

const Left = styled.div`
  flex: 0.7;
  height: 100%;
  position: relative;
  user-select: none;
`;

const Right = styled.div`
  flex: 0.3;
  height: 100%;
  position: relative;
  background-color: #fff;
  padding: 20px 12px;
`;
const NoiDung = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #EBEEF0;
`;
const Title = styled.h2`
  font-size: 26px;
  font-weight: 800;
  line-height: 24px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const Price = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const HangMuc = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  color: #65676b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;

const DiaDiem = styled.div`
  font-size: 12px;
  font-weight: normal;
  line-height: 20px;
  color: #65676b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;

const Main = styled.div`
  height: 100%;
`;
const WrapButton = styled.div`
  padding-top: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #EBEEF0;
  margin-bottom: 15px;
`;
const Buttonn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  background-color: #fff;
  cursor: pointer;
`;
const SendButton = styled(Button)`
  box-shadow: none !important;
  text-transform: none !important;
`;
const CloseButton = styled(Buttonn)`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #000;
  opacity: 0.7;
`;
const InfoUser = styled.div``;

const NextButton = styled(Buttonn)`
  position: absolute;
  top: 50%;
  right: 10px;
`;

const Mota = styled.div``;
const Content = styled.div``;
const PrevButton = styled(Buttonn)`
  position: absolute;
  top: 50%;
  left: 10px;
`;
const ImageMain = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Img = styled.img`
  display: block;
  object-fit: cover;
  max-width: 100%;
  width: 100%;
  height: 100%;
`;
const ListImage = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  left: 50%;
  transform: translate(-50%, -10px);
`;

const BorderImg = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  overflow: hidden;
  margin-left: 6px;
  margin-right: 6px;
  opacity: 0.4;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  filter: blur(8px) drop-shadow(8px 8px 10px black);
  -webkit-filter: blur(6px) drop-shadow(8px 8px 10px black);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
