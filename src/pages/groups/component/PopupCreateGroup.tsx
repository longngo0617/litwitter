import { IconButton, Button, Avatar } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import React from "react";
import styled from "styled-components";
import { SelectFormField } from "../../../components/SelectFormField";
import { TextFormField } from "../../../components/TextFormField";
import CloseIcon from "@material-ui/icons/Close";
import { UserContext } from "../../../utils/useAuth";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { GroupsDocument, MyGroupsDocument, useCreateGroupMutation } from "../../../generated/graphql";
import { toErrorMap } from "../../../utils/toErrorMap";

interface PopupCreateGroupProps {
  onClose: () => void;
  typeGroups: any;
}

export const PopupCreateGroup: React.FC<PopupCreateGroupProps> = ({
  onClose,
  typeGroups,
}) => {
  const [createGroup] = useCreateGroupMutation();
  const { user } = React.useContext(UserContext);
  const inputImage: any = React.useRef(null);
  const [previewImage, setPreviewImage] = React.useState<any>("");
  const publicArr = [
    { name: "Công khai", publicc: true },
    { name: "Riêng tư", publicc: false },
  ];
  const handleImageChange = (e: any) => {
    if (e.target.files) {
      Array.from(e.target.files).map((file) => readerImage(file));
    }
  };

  const readerImage = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage((previewImage: any) =>
        previewImage.concat(e.target?.result as string)
      );
    };
    reader.readAsDataURL(file);
  };
  const [errorImage, setErrorImage] = React.useState<any>({});

  return (
    <Container>
      <Overlay />
      <div className="follow-main">
        <Formik
          initialValues={{
            name: "",
            typeGroup: "",
            describe: "",
            public: true,
            imageCover: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            values.imageCover = previewImage;
            const response : any = await createGroup({
              variables: values,
              refetchQueries: [
                { query: GroupsDocument },
                { query: MyGroupsDocument },
              ],
            });
            if (
              response.data?.createGroup.error.length &&
              response.data?.createGroup.error
            ) {
              setErrors(toErrorMap(response.data?.createGroup.error));
              setErrorImage(
                response.data.createGroup.error.find(
                  (e: any) => e.field === "imageCover"
                )
              );
            } else {
              onClose();
            }
          }}
        >
          {() => (
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
                        onClick={onClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <div className="follow-modal-top-text">
                      <h2 className="title">New Group</h2>
                    </div>
                    <div className="follow-modal-top-icon">
                      <Button
                        aria-label="close-icon"
                        color="primary"
                        className="btn-save"
                        type="submit"
                      >
                        Tạo nhóm
                      </Button>
                    </div>
                  </div>
                </Wrapper>
                <Padding>
                  <div className="follow-modal-bottom">
                    <div className="profile__wrapper">
                      <div className="profile__wrapper">
                        <div className="follow-modal-bottom-itemWrap">
                          <div className="follow-modal-bottom-item">
                            <div className="item">
                              <div className="item-left">
                                <div className="avatar">
                                  <Avatar src={user.profile.avatar || ""} />
                                </div>
                              </div>
                              <div className="item-right">
                                <div className="item-right-top">
                                  <div className="item-right-top-text">
                                    <div className="name-wrap">
                                      <div className="name">
                                        <span>{user.displayname}</span>
                                      </div>
                                      <div className="username">
                                        <span>Quản trị viên</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="profile__wrapper profile__top">
                          <div className="profile__top--cover none-background">
                            <div
                              className="full-width overflow block"
                              style={{ paddingBottom: "33.3333%" }}
                            ></div>
                            <div className="image">
                              <div className="image--big">
                                <div
                                  className="image--background"
                                  style={{
                                    backgroundImage: `url(${
                                      previewImage ? previewImage : ""
                                    })`,
                                  }}
                                ></div>
                                <img
                                  src={`${previewImage ? previewImage : ""}`}
                                  alt=""
                                  className="image--hide"
                                />
                              </div>
                              <div className="image--overlay"></div>
                              <div className="btn-add">
                                <IconButton
                                  aria-label="add banner photo"
                                  onClick={() => inputImage.current.click()}
                                >
                                  <AddAPhotoIcon />
                                </IconButton>
                                <input
                                  accept="image/jpeg,image/png,image/webp,image/gif"
                                  multiple
                                  type="file"
                                  className="input-file"
                                  ref={inputImage}
                                  onChange={handleImageChange}
                                />
                              </div>
                              {previewImage ? (
                                <div className="btn-close">
                                  <IconButton
                                    aria-label="remove banner photo"
                                    onClick={() => {
                                      setPreviewImage("");
                                    }}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {errorImage.field && !previewImage ? (
                          <ErrorText>{errorImage.message}</ErrorText>
                        ) : null}
                        <Field
                          label="Tên nhóm"
                          name="name"
                          component={TextFormField}
                        />
                        <Field
                          options={publicArr}
                          typePublic
                          categories
                          name="public"
                          label="Chọn quyền riêng tư"
                          component={SelectFormField}
                        />
                        <Field
                          options={typeGroups}
                          categories
                          name="typeGroup"
                          label="Loại nhóm"
                          component={SelectFormField}
                        />
                        <Field
                          label="Mô tả"
                          name="describe"
                          multiline
                          rows={8}
                          component={TextFormField}
                        />
                      </div>
                    </div>
                  </div>
                </Padding>
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
  z-index: 3;
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
const Padding = styled.div`
  padding: 0 12px;
`;
const ErrorText = styled.div`
  color: #f44336;
  margin-left: 14px;
  margin-right: 14px;
  margin-top: 3px;
  font-size: 0.75rem;
  margin-top: 3px;
  text-align: left;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
`;
