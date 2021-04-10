import { Avatar, Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../../utils/useAuth";

interface FollowingProps {}

export const Following: React.FC<FollowingProps> = ({}) => {
  const { user } = useContext(UserContext);
  const { url } = useRouteMatch();
  const [follow, setFollow] = useState("follow");
  return (
    <div className="profile__wrapper">
      <nav className="profile__nav">
        <div className="profile__nav--item">
          <Link to={`/${user.username}/followers`} className="link ">
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
                          <span>Vy Le</span>
                        </div>
                        <div className="username">
                          <span>@lnhv.2612000</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div
                    className="item-right-top-button"
                    onMouseEnter={() => setFollow("unfollow")}
                    onMouseLeave={() => setFollow("follow")}
                    style={{minWidth: "102px"}}
                  >
                    <Button variant="contained" className="btn-follow">
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
      </div>
    </div>
  );
};
