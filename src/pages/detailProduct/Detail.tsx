import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { FormatListBulleted } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SendIcon from "@material-ui/icons/Send";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../../components/Loading";
import {
  useCreateRoomChatMutation,
  useProductQuery,
  useSendMessageMutation,
} from "../../generated/graphql";
import { PopUpDirect } from "./component/PopUpDirect";
interface DetailProps {}

function currencyFormat(num: number) {
  return new Intl.NumberFormat("vn", { maximumSignificantDigits: 3 }).format(
    num
  );
}

export const Detail: React.FC<DetailProps> = () => {
  const [sendMessage] = useSendMessageMutation();
  const [createRoomChat] = useCreateRoomChatMutation();
  const [crIndex, SetCrIndex] = useState<number>(0);
  const params: any = useParams();
  const router = useHistory();
  const { data, loading }: any = useProductQuery({
    variables: {
      id: params.id,
    },
  });
  const [display, setDisplay] = useState(false);
  let imageLength = 0;

  if (data) {
    imageLength = data.getProduct.image.length;
  }

  if (!data && loading) {
    return (
      <WrapLoading>
        <Loading blue />
      </WrapLoading>
    );
  }

  return (
    <Wrap>
      <Left>
        <Overlay
        // style={{
        //   backgroundImage: `url(${data?.getProduct?.image[crIndex]})`,
        // }}
        />
        <Main>
          <CloseButton onClick={() => router.goBack()}>
            <CloseIcon style={{ color: "#fff" }} />
          </CloseButton>
          {imageLength > 1 && (
            <>
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
            </>
          )}
          <ImageMain>
            <Img src={data?.getProduct?.image[crIndex]} alt="" />
          </ImageMain>
          {imageLength > 1 && (
            <ListImage>
              {data?.getProduct?.image.map((image: string, index: number) => (
                <BorderImg
                  key={index}
                  className={`${crIndex === index ? "activeImage" : ""}`}
                  onClick={() => SetCrIndex(index)}
                >
                  <Img src={image} />
                </BorderImg>
              ))}
            </ListImage>
          )}
        </Main>
      </Left>
      <Right>
        <RightTop>
          <NoiDung>
            <Title>{data?.getProduct?.body}</Title>
            <Price>{currencyFormat(parseInt(data?.getProduct?.price))} đ</Price>
            <HangMuc>{data?.getProduct.category.name}</HangMuc>
            <DiaDiem>{data?.getProduct.address.location}</DiaDiem>
            <WrapButton>
              <SendButtonn
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => setDisplay(!display)}
              >
                Nhắn tin
              </SendButtonn>
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
                onClick={() =>
                  router.replace(`/users/${data?.getProduct.seller.username}`)
                }
              >
                <div className="item">
                  <div className="item-left">
                    <div className="avatar">
                      <Avatar
                        src={data?.getProduct.seller.profile.avatar || ""}
                      />
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
        </RightTop>
        <RightBottom>
          <Line>
            <MailOutlineIcon />
            <span style={{ marginLeft: "20px" }}>
              Gửi tin nhắn cho người bán{" "}
            </span>
          </Line>
          <Formik
            initialValues={{ content: "Mặt hàng này còn chứ?" }}
            onSubmit={async (values) => {
              const roomChat : any = await createRoomChat({
                variables: {
                  userId: data?.getProduct.seller.id,
                },
              });
              await sendMessage({
                variables: {
                  content: values.content,
                  roomId: roomChat.data?.createRoomChat,
                  image: data.image[0],
                },
              });
            }}
          >
            {({ handleChange, values }) => (
              <FormSubmit autoComplete="off">
                <Input
                  onChange={handleChange}
                  value={values.content}
                  name="content"
                />
                {values.content ? (
                  <SendButton
                    variant="contained"
                    type="submit"
                    startIcon={<SendIcon />}
                  >
                    Gửi tin nhắn
                  </SendButton>
                ) : (
                  <SendButtonDisable
                    variant="contained"
                    type="submit"
                    startIcon={<SendIcon />}
                  >
                    Gửi tin nhắn
                  </SendButtonDisable>
                )}
              </FormSubmit>
            )}
          </Formik>
        </RightBottom>
      </Right>
      {display && (
        <PopUpDirect fc={() => setDisplay(!display)} data={data?.getProduct} />
      )}
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
  display: flex;
  flex-direction: column;
`;
const NoiDung = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef0;
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
const RightTop = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
`;
const RightBottom = styled.div`
  padding: 8px;
  bottom: 0;
  display: flex;
  flex-direction: column;
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
  border-bottom: 1px solid #ebeef0;
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
const SendButtonn = styled(Button)`
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
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
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

const Line = styled.div`
  margin-top: 6px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
`;
const Overlay = styled.div`
  // filter: blur(8px) drop-shadow(8px 8px 10px black);
  // -webkit-filter: blur(6px) drop-shadow(8px 8px 10px black);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #000;
  opacity: 0.9;
`;
const FormSubmit = styled(Form)`
  width: 100%;
`;

const SendButton = styled(SendButtonn)`
  background-color: rgb(29, 161, 242) !important;
  color: #fff !important;
  width: 100%;
`;
const SendButtonDisable = styled(SendButton)`
  opacity: 0.7;
`;
const Input = styled.input`
  padding: 0 10px;
  width: 95%;
  margin-bottom: 10px;
  height: 36px;
  background-color: rgb(235, 238, 240);
  border-radius: 16px;
  flex: 1;
  outline: 0;
  border: 0;
  &:focus {
    border: 1px solid rgb(29, 161, 242);
    background-color: rgb(255, 255, 255);
  }
`;
const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;
