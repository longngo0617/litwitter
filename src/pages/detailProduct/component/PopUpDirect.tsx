import { Avatar, Button, IconButton, TextField } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";
import { currencyFormat } from "../../../utils/toErrorMap";

interface PopUpDirectProps {
  fc: () => void;
  data: any;
}

export const PopUpDirect: React.FC<PopUpDirectProps> = ({ fc, data }) => {
  const contentSample: string[] = [
    "Tôi quan tâm đến mặt hàng này.",
    "Mặt hàng này vẫn còn chứ?",
    "Mặt hàng này đang ở tình trạng thế nào?",
    "Bạn có giao hàng không?",
  ];
  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleClick = (text: string) => {
    setValue(text);
  };
  return (
    <Container>
      <Overlay />
      <div className="follow-main">
        <form autoComplete="off">
          <div className="follow-modal">
            <Wrapper>
              <div className="follow-modal-top" style={{ borderBottom: "0px" }}>
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
                    aria-label="gui tin nhan"
                    color="primary"
                    className="btn-save"
                    type="submit"
                  >
                    Gửi tin nhắn
                  </Button>
                </div>
              </div>
            </Wrapper>
            <Padding>
              <div className="follow-modal-bottom">
                <div className="profile__wrapper">
                  <div className="profile__wrapper">
                    <div
                      className="follow-modal-bottom-itemWrap"
                      style={{ borderBottom: "none" }}
                    >
                      <div className="follow-modal-bottom-item">
                        <div className="item" style={{ alignItems: "center" }}>
                          <div className="item-left">
                            <div className="avatar">
                              <ImageProduct
                                variant="square"
                                src={data.image[0]}
                              />
                            </div>
                          </div>
                          <div className="item-right">
                            <div className="item-right-top">
                              <div className="item-right-top-text">
                                <div className="name-wrap">
                                  <div className="name">{data.body}</div>
                                  <div className="username">
                                    {currencyFormat(data.price)} ₫
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <WrapChip>
                      {contentSample.map((e) => (
                        <Chipp
                          key={e}
                          label={e}
                          onClick={() => {
                            handleClick(e);
                          }}
                        />
                      ))}
                    </WrapChip>

                    <MarginTop>
                      <TextField
                        label="Vui lòng nhâp tin nhắn cho người bán"
                        name="body"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={value}
                        onChange={handleChange}
                      />
                    </MarginTop>
                    <Note>
                      <span style={{ fontWeight: "normal", marginLeft: "4px" }}>
                        Không chia sẻ email, số điện thoại hoặc thông tin tài
                        chính của bạn.
                      </span>
                    </Note>
                  </div>
                </div>
              </div>
            </Padding>
          </div>
        </form>
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
const MarginTop = styled.div`
  margin-top: 50px;
`;
const Padding = styled.div`
  padding: 0 12px;
  border-top: 1px solid #ebeef0;
`;
const ImageProduct = styled(Avatar)`
  height: 64px !important;
  width: 64px !important;
`;
const WrapChip = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Chipp = styled(Chip)`
  margin: 10px 6px 0px !important;
  height: 36px !important;
  padding: 0px 12px !important;
  .MuiChip-label {
    padding: 12px;
  }
`;
const Note = styled.span`
  color: #65676b;
  font-weight: 600;
  line-height: 12px;
  word-break: break-word;
  font-size: 12px;
  margin-top: 12px;
`;
