import { Avatar, Button } from "@material-ui/core";
import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Follow } from "../../../generated/graphql";
import { UserContext } from "../../../utils/useAuth";

interface FollowersProps {}

export const Follower: React.FC<FollowersProps> = ({}) => {
  const { url } = useRouteMatch();
  const { user } = useContext(UserContext);
  console.log(!user.follower.length)
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
          <Link to={`/${user.username}/following`} className="link">
            <div className="link--title">
              <span>Following</span>
            </div>
          </Link>
        </div>
      </nav>
      <div className="profile__wrapper">
        {!user.follower.length ? (
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
          user.follower.map((f: Follow, index: number) => (
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
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div
                        className="item-right-top-button"
                        style={{ minWidth: "102px" }}
                      >
                        <Button variant="contained" className="btn-follow">
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
          ))
        )}
      </div>
    </div>
  );
};
