import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../../utils/useAuth";

interface FollowingProps {}

export const Following: React.FC<FollowingProps> = ({}) => {
  const { user } = useContext(UserContext);
  const {url} = useRouteMatch();
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
    </div>
  );
};
