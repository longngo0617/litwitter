import { Avatar, Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Follow } from "../../../generated/graphql";
import { UserContext } from "../../../utils/useAuth";


export const Following: React.FC<any> = (props) => {
  const { user } = useContext(UserContext);
  const { url } = useRouteMatch();
  const [follow, setFollow] = useState("following");

  return (
    <div className="profile__wrapper">
      <nav className="profile__nav">
        <div className="profile__nav--item">
          <Link to={`/${props?.props?.username}/followers`} className="link ">
            <div className="link--title">
              <span>Followers</span>
            </div>
          </Link>
        </div>
        <div className="profile__nav--item">
          <Link to={`${url}`} className="link active">
            <div className="link--title">
              <span>Following</span>
            </div>
          </Link>
        </div>
      </nav>
      <div className="profile__wrapper">
        {props?.props?.following?.length === 0 ? (
          <div className="profile__wrapper">
            <div className="empty">
              <div className="empty--text">
                <span className="title">Bạn chưa theo dõi ai hết</span>
              </div>
              <div className="empty--text empty--info">
                <span className="info">
                  Khi bạn theo dõi người nào đó, bạn sẽ thấy họ ở đây
                </span>
              </div>
            </div>
          </div>
        ) : (
          props?.props?.following.map((f: Follow, index: number) => (
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
                        onMouseEnter={() => setFollow("unfollow")}
                        onMouseLeave={() => setFollow("following")}
                        style={{ minWidth: "102px" }}
                      >
                        <Button variant="contained" className="btn-follow btn-following">
                          {follow}
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
