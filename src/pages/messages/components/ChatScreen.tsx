import { Avatar, IconButton } from "@material-ui/core";
import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { SnippetUser } from "./SnippetUser";
import {
  useChatQuery,
  useSendMessageMutation,
} from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { Message } from "./Message";
import { UserContext } from "../../../utils/useAuth";
import { Formik, Form } from "formik";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router-dom";
interface ChatScreenProps {
  id: string;
  url:string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ id,url }) => {
  const endOfMessageRef: any = useRef<any>(null);
  const { user } = useContext(UserContext);
  const [sendMessage] = useSendMessageMutation();
  const ScrollToBottom = () => {
    endOfMessageRef.current?.scrollIntoView();
  };
  const { data, loading }: any = useChatQuery({
    variables: { roomId: id },
    pollInterval: 500,
  });
  const router = useHistory();

  const showMessages = () => {
    if (data) {
      return data.getChat?.content.map((message: any, index: number) => (
        <Message
          key={message.id}
          u={message.username}
          message={message.content}
          time={message.createdAt}
        />
      ));
    }
  };

  useEffect(() => {
    ScrollToBottom();
  }, [data?.getChat?.content, id]);

  if (!data && loading) {
    return (
      <WrapLoading>
        <Loading blue />
      </WrapLoading>
    );
  }

  const TypeUser = () => {
    if (data) {
      const member = data.getChat?.members.find(
        (m: any) => m?.username !== user.username
      );
      if (member) {
        return member;
      }
      return data.getChat?.members[0];
    }
  };

  return (
    <Container>
      <Header>
        <HeaderInfomation>
          <UserAvatar src={TypeUser()?.profile?.avatar || ""} />
          <UserInfo>
            <Name>{TypeUser()?.username || "abc"}</Name>
            <Username>@{TypeUser()?.displayname || "aaaa"}</Username>
          </UserInfo>
        </HeaderInfomation>
        <HeaderIcon>
          <IconButton color="primary" aria-label="info user" onClick={() => router.push(`${url}/info`)}>
            <InfoIcon />
          </IconButton>
        </HeaderIcon>
      </Header>
      <Main>
        <MessageContainer>
          <SnippetUser user={TypeUser()} />
          <MessageWrap>{showMessages()}</MessageWrap>
          <EndOfMessage ref={endOfMessageRef} />
        </MessageContainer>
        <InputContainer>
          <Formik
            initialValues={{ content: "" }}
            onSubmit={async (values) => {
              sendMessage({
                variables: {
                  content: values.content,
                  roomId: id,
                },
              });
              values.content = "";
            }}
          >
            {({ handleChange, values }) => (
              <FormSubmit autoComplete="off">
                <Input
                  onChange={handleChange}
                  value={values.content}
                  name="content"
                />
                <IconButton type="submit" disabled={!values.content}>
                  {values.content ? <SendButton /> : <SendButtonDisable />}
                </IconButton>
              </FormSubmit>
            )}
          </Formik>
        </InputContainer>
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
  padding: 20px 16px 0;
  overflow: hidden;
  min-height: 80vh;
`;
const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;
const MessageWrap = styled.div``;
const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  border-top: 1px solid rgb(235, 238, 240);
  padding: 4px;
  max-width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  z-index: 1;
`;
const FormSubmit = styled(Form)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 8px;
`;
const Input = styled.input`
  background-color: rgb(235, 238, 240);
  border-radius: 16px;
  flex: 1;
  outline: 0;
  border: 0;
  height: 24px;
  &:focus {
    border: 1px solid rgb(29, 161, 242);
    background-color: rgb(255, 255, 255);
  }
`;
const SendButton = styled(SendIcon)`
  color: rgb(29, 161, 242);
`;
const SendButtonDisable = styled(SendButton)`
  opacity: 0.7;
`;
const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
