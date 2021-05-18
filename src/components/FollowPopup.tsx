import { Avatar, Button, IconButton } from "@material-ui/core";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../utils/useAuth";
import { Follow, useFollowUserMutation } from "../generated/graphql";


interface FollowPopupProps {
  title: string;
}

export const FollowPopup: React.FC<FollowPopupProps> = ({ title }) => {
  let router = useHistory();
  const { listComment, user, addUser } = useContext(UserContext);
  const [followUser] = useFollowUserMutation();

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
                onClick={() => router.goBack()}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="follow-modal-top-text">
              <h2 className="title">{title} by</h2>
            </div>
          </div>
          <div className="follow-modal-bottom">
            {unique.map((p, i) => (
              <div key={i} className="follow-modal-bottom-itemWrap">
                <div className="follow-modal-bottom-item">
                  <div className="item">
                    <div className="item-left">
                      <div className="avatar">
                        <Avatar src={p.avatar || ""} />
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
                        {user.username === p.username ? null : (
                          <div className="item-right-top-button">
                            {user.following.find(
                              (ele: Follow) => ele.username === p.username
                            ) ? (
                              <Button
                                variant="contained"
                                className="btn-follow btn-following"
                                onClick={async (e: any) => {
                                  const data = await followUser({
                                    variables: {
                                      username: p.username,
                                    },
                                  });
                                  await addUser(data?.data?.following);
                                }}
                              >
                                <span className="following">Following</span>
                                <span className="unfollow">Unfollow</span>
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                className="btn-follow"
                                onClick={async () => {
                                  const data = await followUser({
                                    variables: {
                                      username: p.username,
                                    },
                                  });
                                  await addUser(data?.data?.following);
                                }}
                              >
                                Follow
                              </Button>
                            )}
                          </div>
                        )}
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
