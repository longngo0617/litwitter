import { Button, IconButton } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from "@material-ui/icons/Close";
import { Field, Form, Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { TextFormField } from "../../../components/TextFormField";
import {
  useEditProfileMutation,
  UserDocument,
} from "../../../generated/graphql";
import { UserContext } from "../../../utils/useAuth";
import styled from "styled-components";
interface PopupEditProps {}

export const PopupEdit: React.FC<PopupEditProps> = () => {
  const { user, closeEdit, cacheProfile, editState } = useContext(UserContext);
  const inputImageCover: any = useRef(null);
  const [selectedImageCover, setSelectedImageCover] = useState("");
  const [previewImageCover, setPreviewImageCover] = useState<any>("");
  const inputImage: any = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState<any>("");

  const handleImageCoverChange = (e: any) => {
    const file = e.target.files[0];
    previewFileCover(file);
    setSelectedImageCover(e.target.value);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    previewFileImage(file);
    setSelectedImage(e.target.value);
  };

  const previewFileCover = (file: any) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImageCover(reader.result);
    };
  };

  const previewFileImage = (file: any) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const [editProfile] = useEditProfileMutation();
  if (!editState) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="follow-wrap">
      <div className="follow-overlay"></div>
      <div className="follow-main">
        <Formik
          initialValues={{
            fullName: user.profile.fullName,
            dateOfBirth: user.profile.dateOfBirth,
            avatar: user.profile.avatar,
            imageCover: user.profile.coverImage,
            story: user.profile.story,
          }}
          onSubmit={async (values, { setErrors }) => {
            if (previewImageCover !== "") {
              values.imageCover = previewImageCover as string;
            }
            if (previewImage !== "") {
              values.avatar = previewImage as string;
            }
            const data = await editProfile({
              variables: values,
              refetchQueries: [
                { query: UserDocument, variables: { username: user.username } },
              ],
            });
            cacheProfile(data.data?.editProfile.profile);
            closeEdit();
            setPreviewImageCover("");
            setPreviewImage("");
            setSelectedImageCover("");
            setSelectedImage("");
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="follow-modal">
                <div className="follow-modal-top">
                  <div className="follow-modal-top-icon">
                    <IconButton
                      aria-label="close-icon"
                      color="primary"
                      onClick={closeEdit}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <div className="follow-modal-top-text">
                    <h2 className="title">Edit Profile</h2>
                  </div>
                  <div className="follow-modal-top-icon">
                    {!values.fullName ? (
                      <ButtonDisable
                        aria-label="save"
                        color="primary"
                        className="btn-save"
                      >
                        Save{" "}
                      </ButtonDisable>
                    ) : (
                      <Button
                        aria-label="save"
                        color="primary"
                        className="btn-save"
                        type="submit"
                        disabled={!values.fullName}
                      >
                        Save
                      </Button>
                    )}
                  </div>
                </div>
                <div className="follow-modal-bottom">
                  <div className="profile__wrapper">
                    <div className="profile__wrapper">
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
                                    previewImageCover
                                      ? previewImageCover
                                      : user.profile.coverImage
                                  })`,
                                }}
                              ></div>
                              <img
                                src={`${
                                  previewImageCover
                                    ? previewImageCover
                                    : user.profile.coverImage
                                }`}
                                alt=""
                                className="image--hide"
                              />
                            </div>
                            <div className="image--overlay"></div>
                            <div className="btn-add">
                              <IconButton
                                aria-label="add banner photo"
                                onClick={() => inputImageCover.current.click()}
                              >
                                <AddAPhotoIcon />
                              </IconButton>
                              <input
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                multiple
                                type="file"
                                className="input-file"
                                ref={inputImageCover}
                                value={selectedImageCover}
                                onChange={handleImageCoverChange}
                              />
                            </div>
                            {selectedImageCover ? (
                              <div className="btn-close">
                                <IconButton
                                  aria-label="remove banner photo"
                                  onClick={() => {
                                    setPreviewImageCover("");
                                    setSelectedImageCover("");
                                  }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="profile__top--bio">
                          <div className="bio__avatar">
                            <div className="avatar">
                              <div
                                className="full-width overflow block"
                                style={{ paddingBottom: "100%" }}
                              ></div>
                              <div className="image">
                                <div
                                  className="image--big"
                                  style={{ borderRadius: "9999px" }}
                                >
                                  <div
                                    className="image--background"
                                    style={{
                                      backgroundImage: `url(${
                                        previewImage
                                          ? previewImage
                                          : user.profile.avatar ||
                                            "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                                      })`,
                                    }}
                                  ></div>
                                  <img
                                    src={`${
                                      previewImage
                                        ? previewImage
                                        : user.profile.avatar ||
                                          "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                                    }`}
                                    alt=""
                                    className="image--hide"
                                  />
                                </div>
                                <div className="image--overlay"></div>
                                <div className="btn-add">
                                  <IconButton
                                    aria-label="add avatar photo"
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
                                    value={selectedImage}
                                    onChange={handleImageChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Field
                            label="fullName"
                            name="fullName"
                            value={values.fullName}
                            component={TextFormField}
                          />
                          <Field
                            label="Bio"
                            name="story"
                            value={values.story}
                            component={TextFormField}
                          />
                          <Field
                            label="Date Of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={values.dateOfBirth}
                            component={TextFormField}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.getElementById("react-root") as HTMLElement
  );
};

const ButtonDisable = styled(Button)`
  opacity: 0.7;
`;
