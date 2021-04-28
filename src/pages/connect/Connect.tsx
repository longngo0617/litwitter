import { Avatar, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../../components/Loading";
import { Follow, PostsDocument, useUsersQuery } from "../../generated/graphql";
import { UserContext } from "../../utils/useAuth";
import { WithSide } from "../../utils/withSide";

interface ConnectProps {}

export const Connect: React.FC<ConnectProps> = () => {
  const { data, loading }: any = useUsersQuery();
  const { user, followUser, addUser }: any = useContext(UserContext);
  const router = useHistory();

  return (
    <WithSide>
      <div className="feed">
        <div className="feed__header">
          <ArrowBackIcon
            className="feed__header--icon"
            onClick={() => router.replace("/home")}
          />
          <h2>Connect</h2>
        </div>

        {!data && loading ? (
          <WrapLoading>
            <Loading blue />
          </WrapLoading>
        ) : (
          <Main>
            <Header>
              <Head>Suggested for you</Head>
            </Header>
            <Main>
              {data &&
                data?.getUsers
                  .filter((f: any) => f.username !== user.username)
                  .map((f: any) => (
                    <div key={f.id} className="follow-modal-bottom-itemWrap" onClick={() => router.replace(`/users/${f.username}`)}>
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
                                          refetchQueries: [
                                            { query: PostsDocument },
                                          ],
                                        });
                                        await addUser(data?.data?.following);
                                      }}
                                    >
                                      <span className="following">
                                        Following
                                      </span>
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
          </Main>
        )}
      </div>
    </WithSide>
  );
};

const Container = styled.div``;
const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
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
