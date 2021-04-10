import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../../utils/useAuth";

interface FollowersProps {}

export const Follower: React.FC<FollowersProps> = ({}) => {
    const {url} = useRouteMatch();
    const {user} = useContext(UserContext);
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
          <div className="empty">
              <div className="empty--text">
                  <span className="title">Bạn chưa theo dõi ai hết</span>
              </div>
              <div className="empty--text empty--info">
                  <span className="info">Khi một người nào đó theo dõi bạn, bạn sẽ thấy họ ở đây</span>
              </div>
          </div>
      </div>
    </div>
  );
};