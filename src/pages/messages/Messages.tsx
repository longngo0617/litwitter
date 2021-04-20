import React, { useContext } from "react";
import { UserContext } from "../../utils/useAuth";
import Sidebar from "../home/components/Sidebar";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { Chat } from "./components/Chat";
import { Button } from "@material-ui/core";
import { useChatsQuery } from "../../generated/graphql";
import { ChatScreen } from "./components/ChatScreen";
import { useParams } from "react-router";
import { Loading } from "../../components/Loading";

interface MessagesProps {}

export const Messages: React.FC<MessagesProps> = (props) => {
  const { user } = useContext(UserContext);
  const { data, loading } = useChatsQuery({});
  const params: any = useParams();

  return (
    <div className="wrapper">
      <Sidebar {...user} />
      <Main>
        <ChatContainer>
          <Head>
            <HeadWrap>
              <FullHeight>
                <Title>Messages</Title>
                <ButtonWrap>
                  <ButtonAdd />
                </ButtonWrap>
              </FullHeight>
            </HeadWrap>
          </Head>
          <Bottom>
            <Search>
              <SearchIcon />
              <SearchInput placeholder="Tìm kiếm mọi người hoặc nhóm" />
            </Search>
            {!data && loading ? (
              <Loading />
            ) : (
              <Chats>
                {data?.getRoomChat
                  ? data.getRoomChat.map((r: any, index: number) =>
                      r.members[0].username !== user.username ? (
                        <Chat
                          key={index}
                          id={r.id}
                          user={r.members[0]}
                          lastContent={r.content[r.content.length - 1].content}
                        />
                      ) : (
                        <Chat
                          key={index}
                          id={r.id}
                          user={r.members[1]}
                          lastContent={r.content[r.content.length - 1].content}
                        />
                      )
                    )
                  : null}
              </Chats>
            )}
          </Bottom>
        </ChatContainer>
        <MessagesContainer>
          {!params.id ? (
            <Empty>
              <div className="empty">
                <div className="empty--text">
                  <span className="title">Bạn chưa chọn tin nhắn nào</span>
                </div>
                <div className="empty--text empty--info">
                  <span className="info">
                    Chọn 1 từ những tin nhắn đã tồn tại,hoặc bắt đầu 1 cái mới.
                  </span>
                </div>
                <ButtonLink>
                  <Button
                    href="/messages/compose"
                    color="primary"
                    variant="contained"
                    className="empty--link"
                  >
                    Tin nhắn mới
                  </Button>
                </ButtonLink>
              </div>
            </Empty>
          ) : (
            <ChatScreen id={params?.id} />
          )}
        </MessagesContainer>
      </Main>
    </div>
  );
};

const Main = styled.div`
  flex-shrink: 1;
  flex: 1;
  user-select: text;
  display: flex;
`;
const ChatContainer = styled.div`
  max-width: 600px;
  width: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
  margin-left: auto;
  margin-right: auto;
  border-style: solid;
  border-color: rgb(235, 238, 240);
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Head = styled.div`
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
const HeadWrap = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;
const FullHeight = styled.div`
  height: 100%;
  -webkit-box-flex: 1;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-weight: 800;
  line-height: 24px;
  font-size: 20px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const MessagesContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-right-width: 1px;
  overflow-y: auto;
  border-style: solid;
  border-color: rgb(235, 238, 240);
`;
const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const ButtonWrap = styled.div`
  margin-left: 16px;
  min-height: 32px;
  min-width: 32px;
  -webkit-box-pack: center;
  justify-content: center;
  align-self: stretch;
  -webkit-box-align: end;
  align-items: flex-end;
`;
const ButtonAdd = styled(AddIcon)`
  color: rgba(29, 161, 242, 1);
  cursor: pointer;
`;
const Bottom = styled.div``;
const Search = styled.div`
  border-bottom: 1px solid rgb(235, 238, 240);
  padding: 12px;
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const Chats = styled.div``;
const ButtonLink = styled.div`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
`;
