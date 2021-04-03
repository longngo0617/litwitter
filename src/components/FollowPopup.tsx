import { Avatar, Button, IconButton } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

interface FollowPopupProps {}

export const FollowPopup: React.FC<FollowPopupProps> = () => {

  return ReactDOM.createPortal(
    <div className="follow-wrap">
      <div className="follow-overlay"></div>
      <div className="follow-main">
        <div className="follow-modal">
          <div className="follow-modal-top">
            <div className="follow-modal-top-icon">
              <IconButton aria-label="close-icon" color="primary">
                <CloseIcon />
              </IconButton>
            </div>
            <div className="follow-modal-top-text">
              <h2 className="title">Comment by</h2>
            </div>
          </div>
          <div className="follow-modal-bottom">
            <div className="follow-modal-bottom-itemWrap">
              <div className="follow-modal-bottom-item">
                <div className="item">
                  <div className="item-left">
                    <div className="avatar">
                      <Avatar src="" />
                    </div>
                  </div>
                  <div className="item-right">
                    <div className="item-right-top">
                      <div className="item-right-top-text">
                        <Link to="">
                          <div className="name-wrap">
                            <div className="name">
                              <span>Ayo</span>
                            </div>
                            <div className="username">
                              <span>@elprincetee</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="item-right-top-button">
                        <Button variant="outlined" color="primary">
                          Follow
                        </Button>
                      </div>
                    </div>
                    <div className="item-right-bottom">
                        <span className="body">
                            very cool, calm and calculated Instagram
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="follow-modal-bottom-itemWrap">
              <div className="follow-modal-bottom-item">
                <div className="item">
                  <div className="item-left">
                    <div className="avatar">
                      <Avatar src="" />
                    </div>
                  </div>
                  <div className="item-right">
                    <div className="item-right-top">
                      <div className="item-right-top-text">
                        <Link to="">
                          <div className="name-wrap">
                            <div className="name">
                              <span>Ayo</span>
                            </div>
                            <div className="username">
                              <span>@elprincetee</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="item-right-top-button">
                        <Button variant="outlined" color="primary">
                          Follow
                        </Button>
                      </div>
                    </div>
                    <div className="item-right-bottom">
                        <span className="body">
                            very cool, calm and calculated Instagram
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("react-root") as HTMLElement
  );
};
