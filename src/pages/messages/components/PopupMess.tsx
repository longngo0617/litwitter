import { IconButton, Button, Avatar, LinearProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import {
  ChatsDocument,
  useAddMembersMutation,
  useCreateRoomChatMutation,
  useUsersQuery,
} from "../../../generated/graphql";
import { UserContext } from "../../../utils/useAuth";

interface PopupMessProps {}

export const PopupMess: React.FC<PopupMessProps> = () => {
  const { data }: any = useUsersQuery();
  const [loadingCreate, setLoadingCreate] = React.useState(false);

  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);
  const [arrUser, setArrUser] = useState<any>([]);
  const [arrId, setArrId] = useState<string[]>([]);
  const [createRoomChat] = useCreateRoomChatMutation();
  const { messState, closeMessage, user } = useContext(UserContext);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleClickOutSide = (event: any) => {
    const { current: wrap }: any = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const addItem = (user: any) => {
    const existItem = arrUser.find((x: any) => x.id === user.id);
    if (!existItem) {
      setArrUser([
        ...arrUser,
        {
          id: user.id,
          avatar: user.profile.avatar,
          displayname: user.displayname,
        },
      ]);
      setArrId([...arrId, user.id]);
    }
  };
  const removeItem = (user: any) => {
    const filtered = arrUser.filter((x: any) => x.id !== user.id);
    setArrUser(filtered);
  };

  if (!messState) {
    return null;
  }

  return ReactDOM.createPortal(
    <Container>
      <Overlay />
      <div className="follow-main">
        {loadingCreate && <LinearProgress />}
        <Formik
          initialValues={{
            displayname: "",
          }}
          onSubmit={async (values) => {
            setLoadingCreate(true);

            await createRoomChat({
              variables: { userId: arrId },
              refetchQueries: [{ query: ChatsDocument }],
            });

            closeMessage();
            setLoadingCreate(false);
            setArrId([]);
            setArrUser([]);
          }}
        >
          {({ handleChange, values }) => (
            <Form autoComplete="off">
              <div className="follow-modal">
                <Wrapper>
                  <div
                    className="follow-modal-top"
                    style={{ borderBottom: "0px" }}
                  >
                    <div className="follow-modal-top-icon">
                      <IconButton
                        aria-label="close-icon"
                        color="primary"
                        onClick={closeMessage}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <div className="follow-modal-top-text">
                      <h2 className="title">New Message</h2>
                    </div>
                    <div className="follow-modal-top-icon">
                      {!arrUser.length ? (
                        <ButtonDisable
                          aria-label="close-icon"
                          color="primary"
                          className="btn-save"
                          disabled={!arrUser.lenght}
                        >
                          Next
                        </ButtonDisable>
                      ) : loadingCreate ? (
                        <ButtonDisable
                          aria-label="close-icon"
                          color="primary"
                          className="btn-save"
                          disabled={!arrUser.lenght}
                        >
                          Next
                        </ButtonDisable>
                      ) : (
                        <Button
                          aria-label="close-icon"
                          color="primary"
                          className="btn-save"
                          type="submit"
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </div>
                </Wrapper>
                <Border>
                  <InputContainer>
                    <InputIcon />
                    <Input
                      name="displayname"
                      placeholder="Search people"
                      onChange={handleChange}
                      value={values.displayname}
                      onClick={() => setDisplay(!display)}
                    />
                  </InputContainer>
                  <ArrayUserWrap>
                    {arrUser.map((u: any) => (
                      <ElementWrap key={u.id}>
                        <ElementUser>
                          <UserAvatar src={u.avatar} />
                          <UserName>{u.displayname}</UserName>
                          <UserCloseIcon onClick={() => removeItem(u)} />
                        </ElementUser>
                      </ElementWrap>
                    ))}
                  </ArrayUserWrap>
                </Border>

                <div className="follow-modal-bottom" ref={wrapperRef}>
                  <div className="profile__wrapper">
                    <div className="profile__wrapper">
                      {display &&
                        data?.getUsers
                          .filter(
                            ({ username }: any) => username !== user.username
                          )
                          .filter(
                            ({ username }: any) =>
                              username.indexOf(
                                values.displayname.toLowerCase()
                              ) > -1
                          )
                          .map((u: any, index: number) => {
                            return (
                              <ItemUser
                                key={index}
                                onClick={() => {
                                  addItem(u);
                                  setDisplay(!display);
                                }}
                              >
                                <div className="follow-modal-bottom-item">
                                  <div className="item">
                                    <div className="item-left">
                                      <div className="avatar">
                                        <Avatar src={u.profile.avatar || ""} />
                                      </div>
                                    </div>
                                    <div className="item-right">
                                      <div className="item-right-top">
                                        <div className="item-right-top-text">
                                          <div className="name-wrap">
                                            <div className="name">
                                              <span>{u.displayname}</span>
                                            </div>
                                            <div className="username">
                                              <span>@{u.username}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ItemUser>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>,
    document.getElementById("react-root") as HTMLElement
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  background-color: #000;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;
const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
`;
const InputIcon = styled(SearchIcon)`
  color: rgb(91, 112, 131);
  padding: 12px;
`;
const Input = styled.input`
  flex: 1;
  border: 0;
  outline: none;
  padding: 12px;
`;
const ItemUser = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(235, 238, 240);
  cursor: pointer;
  transition: 0.2s background-color;
  &:hover {
    background-color: rgb(247, 249, 250);
  }
`;
const ArrayUserWrap = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const ElementWrap = styled.div`
  max-width: calc(100% - 16px);
  min-height: 32px;
  background-color: rgba(255, 255, 255, 1);
  margin: 4px;
  border: 1px solid rgb(196, 207, 214);
  border-radius: 9999px;
  display: flex;
  align-items: stretch;
`;
const ElementUser = styled.div`
  padding-left: calc(3px);
  padding-right: 12px;
  outline-style: none;
  display: flex;
  align-items: center;
`;

const UserAvatar = styled(Avatar)`
  margin-right: 8px;
  width: 24px !important;
  height: 24px !important;
`;
const UserName = styled.div`
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
`;
const UserCloseIcon = styled(CloseIcon)`
  margin-left: 12px;
  color: rgba(29, 161, 242, 1);
  width: 18px !important;
  height: 18px !important;
  cursor: pointer;
`;
const Border = styled.div`
  border-bottom: 1px solid rgb(196, 207, 214);
`;
const ButtonDisable = styled(Button)`
  opacity: 0.7;
`;
