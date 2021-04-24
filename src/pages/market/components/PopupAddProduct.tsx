import { Avatar, Button, IconButton, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Field, Form, Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { TextFormField } from "../../../components/TextFormField";
import { UserContext } from "../../../utils/useAuth";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

interface PopupAddProductProps {
  fc: () => void;
}

export const PopupAddProduct: React.FC<PopupAddProductProps> = ({ fc }) => {
  const { user } = useContext(UserContext);
  const inputImage: any = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState<any>("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedImage(e.target.value);
  };

  const previewFile = (file: any) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };
  return (
    <Container>
      <Overlay />
      <div className="follow-main">
        <Formik
          initialValues={{
            title: "",
            price: "",
            mota: "",
          }}
          onSubmit={async (values) => {}}
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
                        onClick={fc}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <div className="follow-modal-top-text">
                      <h2 className="title">New Message</h2>
                    </div>
                    <div className="follow-modal-top-icon">
                      <Button
                        aria-label="close-icon"
                        color="primary"
                        className="btn-save"
                        type="submit"
                      >
                        Tạo bài niêm yết
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
                                        <span>Niêm yết trên Marketplace</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {previewImage ? (
                          <ListImageSelected>
                            <ImageSelected style={{ width: "104px" }}>
                              <Image>
                                <ImageP>
                                  <ImageM src={previewImage} />
                                </ImageP>
                                <ImageC>
                                  <CloseIcon
                                    onClick={() => {
                                      setPreviewImage("");
                                      setSelectedImage("");
                                    }}
                                  />
                                </ImageC>
                              </Image>
                            </ImageSelected>
                            <ImageSelected style={{ width: "104px" }}>
                              <Div>
                                <Button
                                  variant="contained"
                                  color="default"
                                  aria-label="add product photo"
                                  startIcon={<AddAPhotoIcon />}
                                  onClick={() => inputImage.current.click()}
                                >
                                  Thêm ảnh
                                </Button>
                                <input
                                  accept="image/jpeg,image/png,image/webp,image/gif"
                                  multiple
                                  type="file"
                                  className="input-file"
                                //   ref={inputImage}
                                //   value={selectedImage}
                                //   onChange={handleImageChange}
                                />
                              </Div>
                            </ImageSelected>
                          </ListImageSelected>
                        ) : (
                          <ProductImage>
                            <Div>
                              <Button
                                variant="contained"
                                color="default"
                                aria-label="add product photo"
                                startIcon={<AddAPhotoIcon />}
                                onClick={() => inputImage.current.click()}
                              >
                                Thêm ảnh
                              </Button>
                              <input
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                multiple
                                type="file"
                                className="input-file"
                                ref={inputImage}
                                value={selectedImage}
                                onChange={handleImageChange}
                              />
                            </Div>
                          </ProductImage>
                        )}

                        <Field
                          label="Tiêu đề"
                          name="title"
                          component={TextFormField}
                        />
                        <Field
                          label="Giá"
                          name="price"
                          component={TextFormField}
                        />
                        <WrapText>
                          <TextField
                            style={{ width: "100%" }}
                            select
                            label="Hạng mục"
                            //   value={currency}
                            onChange={handleChange}
                            variant="outlined"
                          >
                            {/* {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))} */}
                          </TextField>
                        </WrapText>
                        <WrapText>
                          <TextField
                            style={{ width: "100%" }}
                            select
                            label="Địa chỉ"
                            //   value={currency}
                            onChange={handleChange}
                            variant="outlined"
                          >
                            {/* {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))} */}
                          </TextField>
                        </WrapText>

                        <Field
                          label="Mô tả"
                          name="mota"
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
const Div = styled.div``;
const WrapText = styled.div`
  margin-bottom: 8px;
  margin-top: 16px;
`;
const Padding = styled.div`
  padding: 0 12px;
`;

const ProductImage = styled.div`
  position: relative;
  margin: 12px 0px;
  height: 160px;
  border-radius: 4px;
  border: 1px solid #ced0d4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListImageSelected = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: row;
`;

const ImageSelected = styled.div`
  position: relative;
  margin: 4px;
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
`;
