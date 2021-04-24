import { Button, IconButton, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import { TextFormField } from "../../../components/TextFormField";

interface PopupAddProductProps {
    fc:() => void,
}

export const PopupAddProduct: React.FC<PopupAddProductProps> = ({fc}) => {
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
                      <IconButton aria-label="close-icon" color="primary" onClick={fc}>
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
const WrapText = styled.div`
  margin-bottom: 8px;
  margin-top: 16px;
`;
const Padding = styled.div`
  padding: 0 12px;
`;
