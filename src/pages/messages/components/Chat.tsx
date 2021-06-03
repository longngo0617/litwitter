import { Avatar } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import moment from "moment";
import { UserContext } from "../../../utils/useAuth";
import { User } from "../../../generated/graphql";

interface ChatProps {
  members: [User] | any;
  id: string;
  lastContent: string;
  createdAt: string;
  me: string;
  name: string;
  image: string;
}

export const Chat: React.FC<ChatProps> = ({
  me,
  members,
  id,
  lastContent,
  createdAt,
  name,
  image,
}) => {
  const router = useHistory();
  const { user } = React.useContext(UserContext);

  return (
    <Container onClick={() => router.replace(`/messages/${id}`)}>
      <Item>
        {members.length > 2 ? (
          <div style={{ marginRight: "12px" }}>
            {image ? (
              <UserAvatar src={image} />
            ) : (
              <UserGroup>
                <UserMemberLeft>
                  <img src={members[0].profile?.avatar as string} alt="" />
                </UserMemberLeft>
                <UserMemberRight>
                  <img src={members[1].profile?.avatar as string} alt="" />
                </UserMemberRight>
              </UserGroup>
            )}
          </div>
        ) : (
          <UserAvatar src={members[0]?.profile?.avatar || ""} />
        )}

        <UserInfo>
          <UserInfoLeft>
            <NameWrap>
              <Name>
                {members.length < 2
                  ? (members[0]?.displayname as string)
                      .split(" ")
                      .slice(-1)
                      .join(" ")
                  : // : `${members
                    //     .map((m: any, i: number) =>
                    //       (m?.displayname as string)
                    //         .split(" ")
                    //         .slice(-1)
                    //         .join(" ")
                    //     )
                    //     .join(", ")} và Bạn`
                    name}
              </Name>
              <Username>{!name && `@${members[0]?.username}`}</Username>
              <Time>
                <Username>
                  {createdAt ? moment(createdAt).fromNow() : null}
                </Username>
              </Time>
            </NameWrap>
            <ContentWrap>
              <LastContent>
                {user.username === me ? "Bạn : " : null}
                {lastContent}
              </LastContent>
            </ContentWrap>
          </UserInfoLeft>
        </UserInfo>
      </Item>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  border-bottom: 1px solid rgb(235, 238, 240);
  word-break: break-word;
  transition: 0.2s background-color;
  &:hover {
    background-color: rgb(247, 249, 250);
  }
`;
const Item = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;
const UserAvatar = styled(Avatar)`
  margin-right: 12px;
  -webkit-box-flex: 0;
  flex-grow: 0;
`;
const UserInfo = styled.div`
  flex-grow: 1;
  -webkit-box-flex: 1;
  display: flex;
  align-items: center;
`;

const UserInfoLeft = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const NameWrap = styled.div`
  display: flex;
`;
const Name = styled.span`
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 175px;
`;
const Username = styled.span`
  flex: 1;
  color: rgb(91, 112, 131);
  white-space: nowrap;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
  margin-left: 4px;
`;
const ContentWrap = styled.div`
  max-height: 40px;
  overflow: hidden;
  display: inherit;
`;
const LastContent = styled.span`
  font-weight: 400;
  font-size: 15px;
  color: rgb(91, 112, 131);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Time = styled.div``;
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
