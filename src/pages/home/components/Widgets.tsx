import { Avatar, Button, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../../../components/Loading";
import {
  Follow,
  useFollowUserMutation,
  useUsersQuery,
} from "../../../generated/graphql";
import { UserContext } from "../../../utils/useAuth";

const Widgets = () => {
  const { data, loading }: any = useUsersQuery();
  const { user, addUser }: any = useContext(UserContext);
  const [followUser] = useFollowUserMutation();

  return (
    <div className="widgets">
      {!data && loading ? (
        <WrapLoading>
          <Loading blue />
        </WrapLoading>
      ) : (
        <>
          <div className="widgets__wrap">
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
                              <Avatar src={option.profile.avatar || ""} />
                            </div>
                          </div>
                          <div className="item-right">
                            <div className="item-right-top">
                              <div className="item-right-top-text">
                                <div className="name-wrap">
                                  <div className="name">
                                    <span>{option.displayname}</span>
                                  </div>
                                  <div className="username">
                                    <span>@{option.username}</span>
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
          <Container>
            <Header>
              <Head>Who to follow</Head>
            </Header>
            <Main>
              {data?.getUsers
                .filter((f: any, index: number) => index < 3)
                .map((f: any) => (
                  <div key={f.id} className="follow-modal-bottom-itemWrap">
                    <div className="follow-modal-bottom-item">
                      <div className="item">
                        <div className="item-left">
                          <div className="avatar">
                            <Avatar src={f.profile?.avatar || ""} />
                          </div>
                        </div>
                        <div className="item-right">
                          <div className="item-right-top">
                            <div className="item-right-top-text">
                              <Link to={`/users/${f.username}`}>
                                <div className="name-wrap">
                                  <div className="name">
                                    <span>{f.displayname}</span>
                                  </div>
                                  <div className="username">
                                    <span>@{f.username}</span>
                                    {user.follower.find(
                                      (ele: Follow) =>
                                        ele.username === f.username
                                    ) ? (
                                      <span className="follow--me">
                                        Theo dõi bạn
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Link>
                            </div>
                            {user.username === f?.username ? null : (
                              <div
                                className="item-right-top-button"
                                style={{ minWidth: "102px" }}
                              >
                                {user.following.find(
                                  (ele: Follow) => ele.username === f.username
                                ) ? (
                                  <Button
                                    variant="contained"
                                    className="btn-follow btn-following"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      const data = await followUser({
                                        variables: {
                                          username: f.username,
                                        },
                                      });
                                      await addUser(data?.data?.following);
                                    }}
                                  >
                                    <span className="following">Following</span>
                                    <span className="unfollow">Unfollow</span>
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outlined"
                                    className="btn-follow"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      const data = await followUser({
                                        variables: {
                                          username: f.username,
                                        },
                                      });
                                      await addUser(data?.data?.following);
                                    }}
                                  >
                                    Follow
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="item-right-bottom">
                            <span className="body">{f.story}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

export default Widgets;

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
  font-size: 20px;
  font-weight: 800;
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

const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
