import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { formatDate } from "../../../utils/toErrorMap";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../../utils/useAuth";
interface MainPageProps {}

export const MainPage: React.FC<MainPageProps> = () => {
  const { url } = useRouteMatch();
  const { user } = useContext(UserContext);
  return (
    <div className="profile__wrapper">
      <div className="profile__wrapper">
        <div className="profile__wrapper profile__top">
          <div className="profile__top--cover none-background">
            <div
              className="full-width overflow block"
              style={{ paddingBottom: "33.3333%" }}
            ></div>
            {/* <div className="cover-image">
                <div className="cover-image--big" style={{ marginBottom: "-21%" }}>
                  <div
                    className="cover-image--background"
                    style={{ backgroundImage: `url()` }}
                  ></div>
                  <img src="" alt="" className="cover-image--hide" />
                </div>
              </div> */}
          </div>
          <div className="profile__top--bio">
            <div className="bio__avatar">
              <div className="avatar">
                <div
                  className="full-width overflow block"
                  style={{ paddingBottom: "100%" }}
                ></div>
                <div className="image">
                  <div
                    className="image--big"
                    style={{ borderRadius: "9999px" }}
                  >
                    <div
                      className="image--background"
                      style={{
                        backgroundImage: `url(${user.profile.avatar})`,
                      }}
                    ></div>
                    <img
                      src={`${user.profile.avatar}`}
                      alt=""
                      className="image--hide"
                    />
                  </div>
                </div>
              </div>
              <div className="button">
                <Button variant="outlined" color="primary">
                  Edit profile
                </Button>
              </div>
            </div>
            <div className="bio__name">
              <div className="name">
                <span>{user.displayname}</span>
              </div>
              <div className="username">
                <span>@{user.username}</span>
              </div>
            </div>
            <div className="bio__info">
              <div className="info">
                <span> {user.profile.story}</span>
              </div>
            </div>
            <div className="bio__join">
              <div className="date-join">
                <span>
                  <DateRangeIcon />
                  Tham gia {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
            <div className="bio__follow">
              <div className="bio__follow--item">
                <Link to={`${url}/following`}>
                  <span className="number">{user.following}</span>
                  <span className="title">Following</span>
                </Link>
              </div>
              <div className="bio__follow--item">
                <Link to={`${url}/followers`}>
                  <span className="number">{user.follower}</span>
                  <span className="title">Follower</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <nav className="profile__nav">
          <div className="profile__nav--item">
            <Link to="" className="link active">
              <div className="link--title">
                <span>Tweets</span>
              </div>
            </Link>
          </div>
          <div className="profile__nav--item">
            <Link to="" className="link">
              <div className="link--title">
                <span>Tweets & replies</span>
              </div>
            </Link>
          </div>
          <div className="profile__nav--item">
            <Link to="" className="link">
              <div className="link--title">
                <span>Media</span>
              </div>
            </Link>
          </div>
          <div className="profile__nav--item">
            <Link to="" className="link">
              <div className="link--title">
                <span>Likes</span>
              </div>
            </Link>
          </div>
        </nav>
        <div className="profile__bottom"></div>
      </div>
    </div>
  );
};
