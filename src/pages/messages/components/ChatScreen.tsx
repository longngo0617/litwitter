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
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import CloseIcon from "@material-ui/icons/Close";
import { useOutside } from "@pacote/react-use-outside";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  })
);

interface ChatScreenProps {
  id: string;
  url: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ id, url }) => {
  const classes = useStyles();
  const endOfMessageRef: any = useRef<any>(null);
  const { user } = useContext(UserContext);
  const [sendMessage] = useSendMessageMutation();
  const ScrollToBottom = () => {
    endOfMessageRef.current?.scrollIntoView();
  };
  const { data, loading }: any = useChatQuery({
    variables: { roomId: id },
    pollInterval: 1000,
  });
  const router = useHistory();

  const [imageSelected, setImageSelected] = React.useState<string>("");
  const handleImageChange = (e: any) => {
    if (e.target.files) {
      readerImage(e.target.files[0]);
    }
  };
  const readerImage = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSelected(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  const [openInput, setOpenInput] = React.useState<boolean>(false);
  const ref = useOutside("click", () => {
    setOpenInput(!openInput);
  });
  const showMessages = () => {
    if (data) {
      return data.getChat?.content.map((message: any, index: number) => (
        <Message
          key={message.id}
          u={message.username}
          message={message.content}
          image={message.image}
          time={
            message.username !== data.getChat?.content[index + 1]?.username
              ? message.createdAt
              : ""
          }
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
          <IconButton
            color="primary"
            aria-label="info user"
            onClick={() => router.push(`${url}/info`)}
          >
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
            initialValues={{ content: "", image: "" }}
            onSubmit={async (values) => {
              values.image = imageSelected;
              sendMessage({
                variables: {
                  content: values.content,
                  roomId: id,
                  image: values.image,
                },
              });
              values.content = "";
            }}
          >
            {({ handleChange, values }) => (
              <FormSubmit autoComplete="off">
                {!imageSelected && (
                  <div className={classes.root}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <ImageIcon style={{ color: "rgb(29, 161, 242)" }} />
                      </IconButton>
                    </label>
                  </div>
                )}
                <InputTextWrap open={openInput}>
                  {imageSelected && (
                    <ImageWrap>
                      <ImageSelected style={{ width: "150px" }}>
                        <Image>
                          <ImageP>
                            <ImageM src={imageSelected} />
                          </ImageP>
                          <ImageC>
                            <CloseIcon onClick={() => setImageSelected("")} />
                          </ImageC>
                        </Image>
                      </ImageSelected>
                    </ImageWrap>
                  )}
                  <Input
                    onChange={handleChange}
                    ref={ref as React.RefObject<HTMLInputElement>}
                    value={values.content}
                    placeholder="Gửi 1 tin nhắn mới"
                    name="content"
                    onFocus={() => setOpenInput(!openInput)}
                  />
                </InputTextWrap>

                <IconButton type="submit" disabled={!values.content && !imageSelected }>
                  {values.content || imageSelected ? (
                    <SendButton />
                  ) : (
                    <SendButtonDisable />
                  )}
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
  background-color: inherit;
  padding-right: 12px;
  padding-left: 12px;
  border-radius: 16px;
  flex: 1;
  outline: 0;
  border: 0;
  min-height: 32px;
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

const InputTextWrap = styled.div<{ open: boolean }>`
  display: flex;
  align-items: stretch;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  border-radius: 16px;
  background-color: ${(props: any) =>
    props.open ? "rgb(255,255,255)" : "rgb(235, 238, 240)"};
  border: ${(props: any) => props.open && "1px solid rgb(29, 161, 242)"};
  width: 100%;
  min-height: 32px;
`;
const ImageWrap = styled.div`
  margin: 12px;
`;
const ImageSelected = styled.div`
  position: relative;
`;

const Image = styled.div`
  border-radius: 4px;
  position: relative;
`;
const ImageM = styled.img`
  position: absolute;
  border-radius: 4px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageP = styled.div`
  padding-bottom: 100%;
  width: 100%;
  position: relative;
`;

const ImageC = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
