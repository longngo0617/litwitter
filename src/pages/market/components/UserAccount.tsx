import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMeProductsQuery } from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { currencyFormat } from "../../../utils/toErrorMap";
interface UserAccountProps {}

export const UserAccount: React.FC<UserAccountProps> = () => {
  const { data, loading }: any = useMeProductsQuery();

  if (!data && loading) {
    return (
      <WrapLoading>
        <Loading blue />
      </WrapLoading>
    );
  }
  return (
    <Page>
      <TopBar>
        <Title>Bài niêm yết của bạn</Title>
        <InputContainer>
          <InputIcon />
          <Input
            name="displayname"
            placeholder="Tìm kiếm bài niêm yết"
            // onChange={handleChange}
            // value={values.displayname}
            // onClick={() => setDisplay(!display)}
          />
        </InputContainer>
      </TopBar>
      {/* <Empty>
        <div className="empty">
          <div className="empty--text">
            <span className="title">Tài khoản của bạn</span>
          </div>
          <div className="empty--text empty--info">
            <span className="info">
              Khi bạn bắt đầu bán hàng, bài niêm yết của bạn sẽ hiển thị tại
              đây.
            </span>
          </div>
        </div>
      </Empty> */}
      <ListProduct>
        {data?.getMyProducts?.map((p: any) => (
          <Product>
            <ProductImage>
              <img src={p?.image[0]} />
            </ProductImage>
            <ProductInfo>
              <Wrap>
                <TextW>
                  <TextTop>
                    <Line>
                      <span>{p?.body}</span>
                    </Line>
                    <Line>
                      <span style={{ fontWeight: "normal" }}>
                        {currencyFormat(parseInt(p?.price))}đ
                      </span>
                    </Line>
                  </TextTop>
                  <TextBottom>
                    <Line1>
                      <span>
                        Còn hàng
                        <span style={{ margin: "0 5px" }}>.</span>
                        Đăng lúc 30/4
                      </span>
                    </Line1>
                    <Line1>
                      <span>Đã niêm yết trên Marketplace</span>
                    </Line1>
                  </TextBottom>
                </TextW>
                <ButtonWrap>
                  <Button>
                    <IconCheck />
                    <Text>Đánh dấu là hết hàng</Text>
                  </Button>
                  <ButtonEdit>
                    <EditIcon />
                    <Text style={{ color: "#050505" }}>Chỉnh sửa</Text>
                  </ButtonEdit>
                  <ButtonDelete>
                    <DeleteIcon />
                  </ButtonDelete>
                </ButtonWrap>
              </Wrap>
            </ProductInfo>
          </Product>
        ))}
      </ListProduct>
    </Page>
  );
};

const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;
const Page = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
`;
const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const TopBar = styled.div`
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: flex-start;
`;
const Title = styled.h2`
  font-size: 25px;
  font-weight: 800;
  line-height: 24px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
  flex: 50% 0 0;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 9999px;
  background-color: #f0f2f5;
  flex: 40% 0 0;
`;
const InputIcon = styled(SearchIcon)`
  color: rgb(91, 112, 131);
  padding: 4px;
`;
const Input = styled.input`
  flex: 1;
  border: 0;
  outline: none;
  padding: 8px;
  background-color: inherit;
  border-radius: 9999px;
`;
const ListProduct = styled.div``;
const Product = styled.div`
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: flex-start;
  margin-bottom:12px;
`;
const ProductImage = styled.div`
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 133px;
  height: 133px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    overflow: hidden;
    object-fit: cover;
  }
`;
const ProductInfo = styled.div`
  padding-left: 6px;
  display: flex;
  flex-shrink: 1;
  max-width: 100%;
  flex-direction: column;
  flex-grow: 1;
`;
const Wrap = styled.div`
  display: flex;
  min-height: 137px;
  flex-direction: column;
  justify-content: space-between;
`;
const TextW = styled.div`
  max-width: 100%;
`;
const TextTop = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -3px;
  margin-bottom: -5px;
  cursor: pointer;
`;
const Line = styled.div`
  margin-top: 3px;
  margin-bottom: 3px;
  span {
    color: #050505;
    word-break: break-word;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 1.0625rem;
    line-height: 1.1765;
  }
`;
const TextBottom = styled.div`
  margin-top: 5px;
`;
const Line1 = styled(Line)`
    margin:top:0;
    margin-bottom:4px;
    span {
        display:flex;
        align-items:center;
        font-weight:normal;
        font-size: .8125rem;
        color:#65676b;
    }
`;

const ButtonWrap = styled.div`
  display: flex;
`;
const Button = styled.div`
  margin: 0;
  background-color: rgba(45, 156, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  cursor: pointer;
  flex: 0.5;
  margin-right: 8px;
`;
const IconCheck = styled(CheckIcon)`
  color: #1877f2;
`;
const Text = styled.div`
  margin: 0 3px;
  font-family: inherit;
  font-size: 15px;
  color: #1877f2;
  font-weight: 600;
`;
const ButtonEdit = styled(Button)`
  background-color: #e4e6eb;
  flex: 0.4;
`;
const ButtonDelete = styled(Button)`
  background-color: #e4e6eb;
  flex: 0.1;
`;
