import { Avatar, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../../../components/Loading";
import {
  Follow,
  PostsDocument,
  useChatQuery,
  useFollowUserMutation,
} from "../../../generated/graphql";
import { UserContext } from "../../../utils/useAuth";
import { PopupLeave } from "./PopupLeave";
interface InfoMessageProps {
  id: string;
  url: string;
}
export const InfoMessage: React.FC<InfoMessageProps> = ({ id, url }) => {
  const { user, addUser } = useContext(UserContext);
  const [followUser] = useFollowUserMutation();
  const [f, setF] = useState<any>({});
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const { data, loading }: any = useChatQuery({
    variables: { roomId: id },
  });
  const router = useHistory();

  useEffect(() => {
    if (data) {
      const members = data.getChat?.members;
      if (members.length > 2) {
        setF(members);
      } else {
        setF(members[0]);
      }
    }
  }, [id]);

  if (!data && loading) {
    return (
      <WrapLoading>
        <Loading blue />
      </WrapLoading>
    );
  }

  return (
    <Container>
      <Header>
        <IconWrap onClick={() => router.push(`${url}`)}>
          <ButtonBack color="primary" aria-label="back chat screen">
            <IconBack />
          </ButtonBack>
        </IconWrap>
        <Title>
          {f.length > 2 ? "Thông tin nhóm  " : "Thông tin cuộc trò chuyện"}
        </Title>
      </Header>
      <Main>
        <InfoWrap>
          {f.length > 2 && f.filter((m: any) => m.username !== user.username) ? (
            <>
              <div className="follow-modal-bottom-itemWrap">
                <div className="follow-modal-bottom-item">
                  <div className="item">
                    <div className="item-left">
                      <div className="avatar">
                        <div style={{ marginRight: "12px" }}>
                          <UserGroup>
                            <UserMemberLeft>
                              <img
                                src={f[0].profile?.avatar as string}
                                alt=""
                              />
                            </UserMemberLeft>
                            <UserMemberRight>
                              <img
                                src={f[f.length - 1].profile?.avatar as string}
                                alt=""
                              />
                            </UserMemberRight>
                          </UserGroup>
                        </div>
                      </div>
                    </div>
                    <div className="item-right">
                      <div className="item-right-top">
                        <div className="item-right-top-text">
                          <div className="name-wrap">
                            <div className="name">
                              <span>{`${f
                              .filter((m:any) => m.username !== user.username)
                                .map((m : any) =>
                                  (m?.displayname as string)
                                    .split(" ")
                                    .slice(-1)
                                    .join(" ")
                                )
                                .join(", ")} và Bạn`}</span>
                            </div>
                          </div>
                        </div>

                        <div
                          className="item-right-top-button"
                          style={{ minWidth: "102px" }}
                        >
                          <Button
                            color="primary"
                            style={{
                              color: "rgb(29, 161, 242)",
                              textTransform: "capitalize",
                            }}
                          >
                            Chỉnh sửa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Border />
              <Header>
                <Title>Mọi người</Title>
              </Header>
              {f.filter((m:any) => m.username !== user.username).map((member: any) => (
                <div className="follow-modal-bottom-itemWrap">
                  <Link
                    to={`/users/${member.username}`}
                    className="link link--none"
                  >
                    <div className="follow-modal-bottom-item">
                      <div className="item">
                        <div className="item-left">
                          <div className="avatar">
                            <Avatar src={member.profile?.avatar || ""} />
                          </div>
                        </div>
                        <div className="item-right">
                          <div className="item-right-top">
                            <div className="item-right-top-text">
                              <Link to="">
                                <div className="name-wrap">
                                  <div className="name">
                                    <span>{member.displayname}</span>
                                  </div>
                                  <div className="username">
                                    <span>@{member.username}</span>
                                    {user.follower.find(
                                      (ele: Follow) =>
                                        ele.username === member.username
                                    ) ? (
                                      <span className="follow--me">
                                        Theo dõi bạn
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Link>
                            </div>
                            {user.username === member?.username ? null : (
                              <div
                                className="item-right-top-button"
                                style={{ minWidth: "102px" }}
                              >
                                {user.following.find(
                                  (ele: Follow) =>
                                    ele.username === member.username
                                ) ? (
                                  <Button
                                    variant="contained"
                                    className="btn-follow btn-following"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      const data = await followUser({
                                        variables: {
                                          username: member.username,
                                        },
                                        refetchQueries: [
                                          { query: PostsDocument },
                                        ],
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
                                          username: member.username,
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
                            <span className="body">{member.story}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              <Control>
                <ControlItem>
                  <Item>
                    <Text>Thêm thành viên</Text>
                  </Item>
                </ControlItem>
              </Control>

              <Control>
                <Border />
                <ControlItem>
                  <Item>
                    <Text>Tố cáo cuộc trò chuyện</Text>
                  </Item>
                </ControlItem>
                <ControlItemLeave onClick={() => setOpenPopup(!openPopup)}>
                  <ItemLeave>
                    <Text>Rời khỏi cuộc trò chuyện</Text>
                  </ItemLeave>
                </ControlItemLeave>
              </Control>
            </>
          ) : (
            <>
              <div className="follow-modal-bottom-itemWrap">
                <Link to={`/users/${f.username}`} className="link link--none">
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
                            <Link to="">
                              <div className="name-wrap">
                                <div className="name">
                                  <span>{f.displayname}</span>
                                </div>
                                <div className="username">
                                  <span>@{f.username}</span>
                                  {user.follower.find(
                                    (ele: Follow) => ele.username === f.username
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
                </Link>
              </div>
              <Control>
                <Border />
                <ControlItem>
                  <Item>
                    <Text>Block @{f.username}</Text>
                  </Item>
                </ControlItem>
                <ControlItem>
                  <Item>
                    <Text>Report @{f.username}</Text>
                  </Item>
                </ControlItem>
                <ControlItemLeave onClick={() => setOpenPopup(!openPopup)}>
                  <ItemLeave>
                    <Text>Rời khỏi cuộc trò chuyện</Text>
                  </ItemLeave>
                </ControlItemLeave>
              </Control>
            </>
          )}
        </InfoWrap>
      </Main>
      {openPopup && <PopupLeave fc={() => setOpenPopup(false)} id={id} />}
    </Container>
  );
};

const Container = styled.div``;
const Header = styled.div`
  height: 53px;
  border-bottom-width: 1px;
  border-bottom-color: rgb(196, 207, 214);
  border-style: solid;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  background-color: rgb(255, 255, 255);
`;
const IconWrap = styled.div`
  min-width: 56px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: stretch;
`;
const IconBack = styled(ArrowBackIcon)`
  color: rgba(29, 161, 242, 1);
`;
const Title = styled.h2`
  flex: 1;
  font-weight: 800;
  line-height: 24px;
  font-size: 20px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const Main = styled.div``;
const InfoWrap = styled.div``;
const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const ButtonBack = styled(IconButton)`
  transition: 0.2s background-color;
  &:hover {
    background-color: rgba(29, 162, 241, 0.1);
  }
`;
const Control = styled.div``;
const Border = styled.div`
  height: 12px;
  border-bottom: 1px solid rgb(235, 238, 240);
  background-color: rgb(247, 249, 250);
`;
const ControlItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid rgb(235, 238, 240);
  transition: 0.2s background-color;
  &:hover {
    background-color: rgba(29, 162, 241, 0.1);
  }
  cursor: pointer;
`;
const Item = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: rgba(29, 161, 242, 1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;
const Text = styled.span`
  color: inherit;
  font: inherit;
  white-space: inherit;
  font-family: inherit;
`;
const ControlItemLeave = styled(ControlItem)`
  &:hover {
    background-color: rgba(224, 36, 94, 0.1);
  }
`;
const ItemLeave = styled(Item)`
  color: rgba(224, 36, 94, 1);
`;
const UserGroup = styled.div`
  border-radius: 9999px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  width: 40px;
  height: 40px;
  position: relative;
`;
const UserMemberLeft = styled.div`
  flex: 1;
  img {
    color: transparent;
    width: 100%;
    height: 100%;
    object-fit: cover;
    text-align: center;
    text-indent: 10000px;
  }
`;
const UserMemberRight = styled(UserMemberLeft)`
  margin-left: 1px;
  margin-right: calc(-1px);
`;
