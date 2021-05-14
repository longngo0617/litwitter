import { Avatar, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../../../components/Loading";

interface WidgetsProps {
  data: any;
  loading: boolean;
  onOpen: () => void;
}

export const Widgets: React.FC<WidgetsProps> = ({ data, loading, onOpen }) => {

  return (
    <div className="widgets" style={{ flex: 0.2, padding: "0 20px" }}>
      {!data && loading ? (
        <WrapLoading>
          <Loading blue />
        </WrapLoading>
      ) : (
        <>
          <div className="widgets__wrap" style={{ marginTop: "20px" }}>
            <div className="widgets__searchIcon">
              <SearchIcon />
            </div>
            <div className="widgets__input">
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={data?.getUsers}
                renderInput={(params) => (
                  <TextField {...params} margin="normal" variant="outlined" />
                )}
                getOptionLabel={(option: any) => ``}
                renderOption={(option) => (
                  <div className="follow-modal-bottom-itemWrap full-width">
                    <Link
                      to={`/users/${option.username}`}
                      className="link link--none"
                    >
                      <div className="follow-modal-bottom-item">
                        <div className="item">
                          <div className="item-left">
                            <div className="avatar">
                              <IconBackGround>
                                <SearchIcon />
                              </IconBackGround>
                            </div>
                          </div>
                          <div className="item-right">
                            <div className="item-right-top">
                              <div className="item-right-top-text">
                                <div className="name-wrap">
                                  <div className="name">
                                    <span>{option.name}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              />
            </div>
          </div>
          <ButtonWrap>
            <Button onClick={onOpen}>
              <IconAdd />
              <Text>Tạo nhóm mới</Text>
            </Button>
          </ButtonWrap>
          <Container>
            <Header>
              <Head>Nhóm bạn đã tham gia</Head>
            </Header>
            <Main>
              {/* {data?.getUsers
                .filter((f: any, index: number) => index < 3)
                .map((f: any) => (
                  
                ))} */}
              <div className="follow-modal-bottom-itemWrap">
                <div className="follow-modal-bottom-item">
                  <div className="item">
                    <div className="item-left">
                      <div className="avatar">
                        <GroupAvatar variant="square" src={""} />
                      </div>
                    </div>
                    <div className="item-right">
                      <div className="item-right-top">
                        <div className="item-right-top-text">
                          <Link to={`/groups/`}>
                            <div className="name-wrap">
                              <div className="name">
                                <span>Dao meo</span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div
                        className="item-right-bottom"
                        style={{ paddingTop: 0 }}
                      >
                        <span className="body" style={{ fontSize: "12px" }}>
                          Meo meo meo
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Main>
            <Footer to="/connect">
              <TextLink>Show more</TextLink>
            </Footer>
          </Container>
        </>
      )}
    </div>
  );
};
const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const IconBackGround = styled.div`
  border-radius: 50%;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
`;

const Container = styled.div`
  min-height: 15rem;
  background-color: rgb(247, 249, 250);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  border-bottom: 1px solid rgb(235, 238, 240);
  padding: 12px 16px;
`;
const Head = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const Main = styled.div``;
const Footer = styled(Link)`
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 16px;
  text-decoration: none;
`;
const TextLink = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: rgb(29, 161, 242);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const GroupAvatar = styled(Avatar)`
  border-radius: 8px;
`;
const ButtonWrap = styled.div`
  margin: 8px 16px;
`;
const Button = styled.div`
  margin: 0;
  background-color: rgb(29, 161, 242);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 12px;
  cursor: pointer;
`;
const Text = styled.div`
  margin: 0 3px;
  font-family: inherit;
  font-size: 15px;
  color: #fff;
  font-weight: 600;
`;

const IconAdd = styled(AddIcon)`
  color: #fff;
`;
