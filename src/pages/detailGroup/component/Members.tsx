import React from "react";
import styled from "styled-components";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar, Button } from "@material-ui/core";
import {
  Follow,
  Member,
  useFollowUserMutation,
  User,
} from "../../../generated/graphql";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../utils/useAuth";

interface MembersProps {
  members: [User];
  admins: [User];
  leader: User;
}

export const Members: React.FC<MembersProps> = ({
  members,
  admins,
  leader,
}) => {
  const router = useHistory();
  const { user, addUser } = React.useContext(UserContext);
  const [followUser] = useFollowUserMutation();
  return (
    <Box style={{ backgroundColor: "#f0f2f5" }}>
      <Introduce>
        <Title>
          <TitleInside style={{ flexDirection: "row" }}>
            <h2 style={{ paddingRight: "5px" }}>Thành viên</h2>
            <span style={{ margin: "0 2px" }}>•</span>
            <span style={{ padding: "0 5px" }}>{members.length}</span>
          </TitleInside>
          {/** tim kiem */}
        </Title>
        <Box2>
          <Hr />
          <div style={{ marginBottom: "10px" }}>
            <Title>
              <TitleInside style={{ flexDirection: "row" }}>
                <h2 style={{ paddingRight: "5px" }}>
                  Quản trị viên và người kiểm duyệt
                </h2>
                <span style={{ margin: "0 2px" }}>•</span>
                <span style={{ padding: "0 5px" }}>
                  {admins.concat(leader).length}
                </span>
              </TitleInside>
            </Title>
            <MemberWrap>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {admins.concat(leader).map((ad) => (
                  <div key={ad?.id} className="follow-modal-bottom-itemWrap">
                    <div
                      className="follow-modal-bottom-item"
                      onClick={() => router.replace(`/users/${ad?.username}`)}
                    >
                      <div className="item">
                        <div className="item-left">
                          <div className="avatar">
                            <Avatar src={ad?.profile?.avatar || ""} />
                          </div>
                        </div>
                        <div className="item-right">
                          <div className="item-right-top">
                            <div className="item-right-top-text">
                              <div className="name-wrap">
                                <div className="name">
                                  <span>{ad?.displayname}</span>
                                </div>
                                <div className="username">
                                  <span>@{ad?.username}</span>
                                  {user.follower.find(
                                    (ele: Follow) =>
                                      ele.username === ad?.username
                                  ) ? (
                                    <span className="follow--me">
                                      Theo dõi bạn
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            {user.username === ad?.username ? null : (
                              <div
                                className="item-right-top-button"
                                style={{ minWidth: "102px" }}
                              >
                                {user.following.find(
                                  (ele: Follow) => ele.username === ad?.username
                                ) ? (
                                  <Button
                                    variant="contained"
                                    className="btn-follow btn-following"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      const data = await followUser({
                                        variables: {
                                          username: ad?.username,
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
                                          username: ad?.username,
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
                            <span className="body">{ad?.profile?.story}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {admins.concat(leader).length > 3 && (
                <div style={{ padding: "16px" }}>
                  <ButtonJoin
                    variant="contained"
                    //   onClick={() => router.push(`${url}`)}
                  >
                    Xem tất cả
                  </ButtonJoin>
                </div>
              )}
            </MemberWrap>
          </div>
        </Box2>
        <Box2>
          <Hr />
          <div style={{ marginBottom: "10px" }}>
            <Title>
              <TitleInside style={{ flexDirection: "row" }}>
                <h2 style={{ paddingRight: "5px" }}>Bạn bè</h2>
                <span style={{ margin: "0 2px" }}>•</span>
                <span style={{ padding: "0 5px" }}>
                  {
                    members.filter((m) =>
                      user.following.find((u: any) => u.username === m.username)
                    ).length
                  }
                </span>
              </TitleInside>
            </Title>
            <MemberWrap>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {members
                  .filter((m) =>
                    user.following.find((u: any) => u.username === m.username)
                  )
                  .map((m) => (
                    <div key={m?.id} className="follow-modal-bottom-itemWrap">
                      <div
                        className="follow-modal-bottom-item"
                        onClick={() => router.replace(`/users/${m?.username}`)}
                      >
                        <div className="item">
                          <div className="item-left">
                            <div className="avatar">
                              <Avatar src={m?.profile?.avatar || ""} />
                            </div>
                          </div>
                          <div className="item-right">
                            <div className="item-right-top">
                              <div className="item-right-top-text">
                                <div className="name-wrap">
                                  <div className="name">
                                    <span>{m?.displayname}</span>
                                  </div>
                                  <div className="username">
                                    <span>@{m?.username}</span>
                                    {user.follower.find(
                                      (ele: Follow) =>
                                        ele.username === m?.username
                                    ) ? (
                                      <span className="follow--me">
                                        Theo dõi bạn
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              {user.username === m?.username ? null : (
                                <div
                                  className="item-right-top-button"
                                  style={{ minWidth: "102px" }}
                                >
                                  {user.following.find(
                                    (ele: Follow) =>
                                      ele.username === m?.username
                                  ) ? (
                                    <Button
                                      variant="contained"
                                      className="btn-follow btn-following"
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        const data = await followUser({
                                          variables: {
                                            username: m?.username,
                                          },
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
                                            username: m?.username,
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
                              <span className="body">{m?.profile?.story}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {members.filter((m) =>
                user.following.find((u: any) => u.username === m.username)
              ).length > 3 && (
                <div style={{ padding: "16px" }}>
                  <ButtonJoin
                    variant="contained"
                    //   onClick={() => router.push(`${url}`)}
                  >
                    Xem tất cả
                  </ButtonJoin>
                </div>
              )}
            </MemberWrap>
          </div>
        </Box2>
        <Box2>
          <Hr />
          <div style={{ marginBottom: "10px" }}>
            <Title>
              <TitleInside style={{ flexDirection: "row" }}>
                <h2 style={{ paddingRight: "5px" }}>Thành viên khác</h2>
                <span style={{ margin: "0 2px" }}>•</span>
                <span style={{ padding: "0 5px" }}>
                  {
                    members
                      .filter((m) => m.username !== user.username)
                      .filter(
                        (m) =>
                          !user.following.find(
                            (u: any) => u.username === m.username
                          )
                      ).length
                  }
                </span>
              </TitleInside>
            </Title>
            <MemberWrap>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {members
                  .filter((m) => m.username !== user.username)
                  .filter(
                    (m) =>
                      !user.following.find(
                        (u: any) => u.username === m.username
                      )
                  )
                  .map((m) => (
                    <div key={m?.id} className="follow-modal-bottom-itemWrap">
                      <div
                        className="follow-modal-bottom-item"
                        onClick={() => router.replace(`/users/${m?.username}`)}
                      >
                        <div className="item">
                          <div className="item-left">
                            <div className="avatar">
                              <Avatar src={m?.profile?.avatar || ""} />
                            </div>
                          </div>
                          <div className="item-right">
                            <div className="item-right-top">
                              <div className="item-right-top-text">
                                <div className="name-wrap">
                                  <div className="name">
                                    <span>{m?.displayname}</span>
                                  </div>
                                  <div className="username">
                                    <span>@{m?.username}</span>
                                    {user.follower.find(
                                      (ele: Follow) =>
                                        ele.username === m?.username
                                    ) ? (
                                      <span className="follow--me">
                                        Theo dõi bạn
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              {user.username === m?.username ? null : (
                                <div
                                  className="item-right-top-button"
                                  style={{ minWidth: "102px" }}
                                >
                                  {user.following.find(
                                    (ele: Follow) =>
                                      ele.username === m?.username
                                  ) ? (
                                    <Button
                                      variant="contained"
                                      className="btn-follow btn-following"
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        const data = await followUser({
                                          variables: {
                                            username: m?.username,
                                          },
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
                                            username: m?.username,
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
                              <span className="body">{m?.profile?.story}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {members.filter((m) =>
                user.following.find((u: any) => u.username === m.username)
              ).length > 3 && (
                <div style={{ padding: "16px" }}>
                  <ButtonJoin
                    variant="contained"
                    //   onClick={() => router.push(`${url}`)}
                  >
                    Xem tất cả
                  </ButtonJoin>
                </div>
              )}
            </MemberWrap>
          </div>
        </Box2>
      </Introduce>
    </Box>
  );
};
const UserAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Box2 = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
`;
const Introduce = styled.div`
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-width: 500px;
  margin: 8px;
  position: relative;
`;
const Title = styled.div`
  margin: 4px;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;
const TitleInside = styled.div`
  padding: 20px 0 4px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    padding: 0 16px;
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
  span {
    color: #656763;
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
const Hr = styled.hr`
  background: #dadde1;
  border-width: 0;
  color: #dadde1;
  height: 1px;
  background-color: #ced0d4;
  margin: 12px 16px 0;
`;
const Describe = styled.div`
  padding: 12px 16px;
  font-family: inherit;
  span {
    color: #050505;
    word-break: break-word;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 0.9375rem;
    line-height: 1.3333;
  }
`;
const Line = styled.div`
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
`;
const LineInfo = styled.div`
  padding-right: 16px;
  padding-left: 16px;
  display: flex;
  flex-direction: row;
`;
const LineInfoWrap = styled.div`
  margin: -5px 0;
  padding: 6px;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  min-width: 0;
`;
const Topic = styled.div`
  margin: 5px 0;
  span {
    color: #050505;
    word-break: break-word;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 0.9375rem;
    line-height: 1.3333;
  }
`;
const Content = styled.div`
  margin: 5px 0;
  span {
    color: #050505;
    word-break: break-word;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 0.8125rem;
    line-height: 1.2308;
  }
`;
const MemberWrap = styled.div`
  padding-top: 16px;
  padding-right: 12px;
  padding-left: 12px;
`;
const ButtonJoin = styled(Button)`
  width: 100%;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`;
