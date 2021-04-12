import { Avatar, Button } from "@material-ui/core";
import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Follow } from "../../../generated/graphql";
import { UserContext } from "../../../utils/useAuth";

export const Follower: React.FC<any> = (props) => {
  const { url } = useRouteMatch();
  const { user } = useContext(UserContext);
  return (
    <div className="profile__wrapper">
      <nav className="profile__nav">
        <div className="profile__nav--item">
          <Link to={`${url}`} className="link active">
            <div className="link--title">
              <span>Followers</span>
            </div>
          </Link>
        </div>
        <div className="profile__nav--item">
          <Link to={`/${props?.props?.username}/following`} className="link">
            <div className="link--title">
              <span>Following</span>
            </div>
          </Link>
        </div>
      </nav>
      <div className="profile__wrapper">
        {props?.props?.follower?.length === 0 ? (
          <div className="profile__wrapper">
            <div className="empty">
              <div className="empty--text">
                <span className="title">
                  Bạn chưa có người theo dõi nào hết
                </span>
              </div>
              <div className="empty--text empty--info">
                <span className="info">
                  Khi một người nào đó theo dõi bạn, bạn sẽ thấy họ ở đây
                </span>
              </div>
            </div>
          </div>
        ) : (
          props?.props?.follower.map((f: Follow, index: number) => (
            <div key={index} className="follow-modal-bottom-itemWrap">
              <div className="follow-modal-bottom-item">
                <div className="item">
                  <div className="item-left">
                    <div className="avatar">
                      <Avatar src={f ? f.avatar : ""} />
                    </div>
                  </div>
                  <div className="item-right">
                    <div className="item-right-top">
                      <div className="item-right-top-text">
                        <Link to="">
                          <div className="name-wrap">
                            <div className="name">
                              <span>{f.displayname}</span>
                            </div>
                            <div className="username">
                              <span>@{f.username}</span>
                              {user.follower.find((ele:Follow) => ele.username === f.username) ? (
                                <span className="follow--me">Theo dõi bạn</span>
                              ) : null}
                            </div>
                          </div>
                        </Link>
                      </div>
                      {user.username === f.username ? null : (
                        <div
                          className="item-right-top-button"
                          style={{ minWidth: "102px" }}
                        >
                          {user.following.find(
                            (ele: Follow) => ele.username === f.username
                          ) ? (
                            <Button
                              variant="contained"
                              className="btn-follow btn-following"
                              onMouseEnter={(e : any) => e.target.children[0].innerText = "Unfollow"}
                              onMouseLeave={(e : any) => e.target.children[0].innerText = "Following"}
                            >
                              Following
                            </Button>
                          ) : (
                            <Button variant="outlined" className="btn-follow">
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
          ))
        )}
      </div>
    </div>
  );
};
