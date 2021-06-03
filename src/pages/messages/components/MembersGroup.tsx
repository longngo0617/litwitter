import React, { useContext } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import {
  Follow,
  PostsDocument,
  useFollowUserMutation,
  useChatQuery,
} from "../../../generated/graphql";
import { UserContext } from "../../../utils/useAuth";

interface MembersGroupProps {
  id: string;
}

export const MembersGroup: React.FC<MembersGroupProps> = ({ id }) => {
  const router = useHistory();
  const { user, addUser, addMember } = useContext(UserContext);
  const [followUser] = useFollowUserMutation();
  const { data, loading } = useChatQuery({
    variables: { roomId: id },
  });

  return (
    <Container>
      <Header>
        <IconWrap onClick={() => router.goBack()}>
          <ButtonBack color="primary" aria-label="back chat screen">
            <IconBack />
          </ButtonBack>
        </IconWrap>
        <Title>Mọi người</Title>
      </Header>
      <Main>
        <InfoWrap>
          {data?.getChat &&
            data.getChat.members
              .map((member: any) => (
                <div
                  className="follow-modal-bottom-itemWrap"
                  onClick={() => router.replace(`/users/${member.username}`)}
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
                </div>
              ))}
          <Control>
            <ControlItem
              onClick={() =>
                addMember(
                  id,
                  data?.getChat && data?.getChat?.members.filter((m : any) => m.username !== user.username)
                )
              }
            >
              <Item>
                <Text>Thêm thành viên</Text>
              </Item>
            </ControlItem>
          </Control>
        </InfoWrap>
      </Main>
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
