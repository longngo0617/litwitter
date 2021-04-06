import { Avatar, Button, IconButton } from "@material-ui/core";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../utils/useAuth";

interface FollowPopupProps {}

export const FollowPopup: React.FC<FollowPopupProps> = () => {
  let router = useHistory();
  const { listComment } = useContext(UserContext);
  //arr.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
  const unique = listComment.filter(
    (val, index, a) => a.findIndex((t) => t.username === val.username) === index
  );

  return ReactDOM.createPortal(
    <div className="follow-wrap">
      <div className="follow-overlay"></div>
      <div className="follow-main">
        <div className="follow-modal">
          <div className="follow-modal-top">
            <div className="follow-modal-top-icon">
              <IconButton
                aria-label="close-icon"
                color="primary"
                onClick={() =>
                  router.push(router.location.pathname.replace("/comments", ""))
                }
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="follow-modal-top-text">
              <h2 className="title">Commented by</h2>
            </div>
          </div>
          <div className="follow-modal-bottom">
            {unique.map((p) => (
              <div key={p.id} className="follow-modal-bottom-itemWrap">
                <div className="follow-modal-bottom-item">
                  <div className="item">
                    <div className="item-left">
                      <div className="avatar">
                        <Avatar src={p.avatar ? p.avatar : ""} />
                      </div>
                    </div>
                    <div className="item-right">
                      <div className="item-right-top">
                        <div className="item-right-top-text">
                          <Link to="">
                            <div className="name-wrap">
                              <div className="name">
                                <span>{p.displayname}</span>
                              </div>
                              <div className="username">
                                <span>@{p.username}</span>
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
                        <span className="body">info user</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("react-root") as HTMLElement
  );
};
