import { Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import { IconButton, Button, Avatar, LinearProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { TextFormField } from "../../../components/TextFormField";
import { useEditRoomChatMutation } from "../../../generated/graphql";

interface PopupEditGroupProps {
  onClose: () => void;
  id: string;
  name: string;
  image: string;
  avatarFirst:string;
  avatarSecond:string;
}

export const PopupEditGroup: React.FC<PopupEditGroupProps> = ({
  onClose,
  id,
  name,
  image,
  avatarFirst,
  avatarSecond
}) => {
  const [loadingCreate, setLoadingCreate] = React.useState(false);
  const [editRoomChat] = useEditRoomChatMutation();
  const inputImage: any = React.useRef(null);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState<any>("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    previewFileImage(file);
    setSelectedImage(e.target.value);
  };

  const previewFileImage = (file: any) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      console.log(reader.result)
    };
  };
  return (
    <Container>
      <Overlay />
      <div className="follow-main" style={{ minHeight: 0 }}>
        {loadingCreate && <LinearProgress />}
        <Formik
          initialValues={{
            groupName: name,
            image,
          }}
          onSubmit={async (values) => {
            setLoadingCreate(true);
            if (previewImage) {
              values.image = previewImage;
            }

            await editRoomChat({
              variables: {
                roomId: id,
                image: values.image,
                name: values.groupName,
              },
            });

            setLoadingCreate(false);
            onClose()
          }}
        >
          {({ values }) => (
            <Form autoComplete="off">
              <div className="follow-modal">
                <Wrapper>
                  <div className="follow-modal-top">
                    <div className="follow-modal-top-icon">
                      <IconButton
                        aria-label="close-icon"
                        color="primary"
                        onClick={onClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <div className="follow-modal-top-text">
                      <h2 className="title">Edit</h2>
                    </div>
                    <div className="follow-modal-top-icon">
                      {!values.groupName ? (
                        <ButtonDisable
                          aria-label="close-icon"
                          color="primary"
                          className="btn-save"
                          disabled={!values.groupName}
                        >
                          Save
                        </ButtonDisable>
                      ) : loadingCreate ? (
                        <ButtonDisable
                          aria-label="close-icon"
                          color="primary"
                          className="btn-save"
                          disabled={!values.groupName}
                        >
                          Save
                        </ButtonDisable>
                      ) : (
                        <Button
                          aria-label="close-icon"
                          color="primary"
                          className="btn-save"
                          type="submit"
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </div>
                </Wrapper>

                <div className="follow-modal-bottom" style={{ minHeight: 0 }}>
                  <div className="profile__wrapper">
                    <div className="profile__wrapper">
                      <EditAvatar>
                        <EditAvatarPad>
                          <UserGroup>
                            <UserGroup>
                              {previewImage ? (
                                <img src={previewImage} />
                              ) : image ? (
                                <img src={image} />
                              ) : (
                                <>
                                  <UserMemberLeft>
                                    <img src={avatarFirst} alt="" />
                                  </UserMemberLeft>
                                  <UserMemberRight>
                                    <img src={avatarSecond} alt="" />
                                  </UserMemberRight>
                                </>
                              )}
                            </UserGroup>
                            <OverlayAvatar />
                            <Mid>
                              <div className="btn-add">
                                <IconButton
                                  aria-label="add avatar photo"
                                  onClick={() => inputImage.current.click()}
                                >
                                  <AddAPhotoIcon />
                                </IconButton>
                                <input
                                  accept="image/jpeg,image/png,image/webp,image/gif"
                                  type="file"
                                  className="input-file"
                                  ref={inputImage}
                                  onChange={handleImageChange}
                                />
                              </div>
                            </Mid>
                          </UserGroup>
                        </EditAvatarPad>
                      </EditAvatar>
                      <Border />
                      <TextName>
                        <Field
                          label="Group name"
                          name="groupName"
                          value={values.groupName}
                          component={TextFormField}
                        />
                      </TextName>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
`;
const ButtonDisable = styled(Button)`
  opacity: 0.7;
`;

const EditAvatar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const EditAvatarPad = styled(EditAvatar)`
  padding: 20px 0;
  justify-content: center;
  position: relative;
`;
const UserGroup = styled.div`
  border-radius: 9999px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100px;
  height: 100px;
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
const OverlayAvatar = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 9999px;
`;
const Mid = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;
const Border = styled.div`
  height: 12px;
  border: 1px solid rgb(235, 238, 240);
  background-color: rgb(247, 249, 250);
`;
const TextName = styled.div`
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: stretch;
  flex-direction: column;
  .MuiFormControl-marginNormal {
    margin: 0;
  }
`;
