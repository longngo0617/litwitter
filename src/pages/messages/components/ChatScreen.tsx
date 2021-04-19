import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { SnippetUser } from "./SnippetUser";
import { useChatQuery } from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { Message } from "./Message";
interface ChatScreenProps {
  id: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ id }) => {
  const { data, loading } = useChatQuery({
    variables: { roomId: id },
  });
  if (!data && loading) {
    return <Loading />;
  }
  const showMessages = () => {
    if (data) {
      return data.getChat?.content.map((message: any) => (
        <Message
          key={message.id}
          u={message.username}
          message={message.content}
        />
      ));
    }
  };
  return (
    <Container>
      <Header>
        <HeaderInfomation>
          <UserAvatar />
          <UserInfo>
            <Name>Abc</Name>
            <Username>@aaaa</Username>
          </UserInfo>
        </HeaderInfomation>
        <HeaderIcon>
          <InfoIcon />
        </HeaderIcon>
      </Header>
      <Main>
        <MessageContainer>
          <MessageWrap>
            <SnippetUser user={data?.getChat?.members[0]} />
          </MessageWrap>
          {showMessages()}
          {/* show messages */}
          <EndOfMessage />
        </MessageContainer>
      </Main>
    </Container>
  );
};

const Container = styled.div``;
const Header = styled.div`
  z-index: 1;
  position: sticky;
  backface-visibility: hidden;
  top: 0;
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
const HeaderInfomation = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
const UserAvatar = styled(Avatar)`
  margin-right: 12px;
  -webkit-box-flex: 0;
  flex-grow: 0;
`;
const UserInfo = styled.div``;
const Name = styled.h2`
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
`;
const Username = styled.div`
  color: rgb(91, 112, 131);
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
`;
const HeaderIcon = styled.div`
  margin-left: 16px;
  height: 100%;
  display: flex;
  align-items: center;
`;
const InfoIcon = styled(InfoOutlinedIcon)`
  color: rgba(29, 161, 242, 1);
`;
const Main = styled.div``;
const MessageContainer = styled.div`
  padding-top: 20px;
  overflow: hidden;
  max-height: 100%;
  height: 100%;
`;
const EndOfMessage = styled.div``;
const MessageWrap = styled.div``;
