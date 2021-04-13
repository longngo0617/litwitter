import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { formatDate } from "../../../utils/toErrorMap";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../../utils/useAuth";
import { UserQuery } from "../../../generated/graphql";


export const MainPage: React.FC<UserQuery> = (props) => {
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
            <div className="image">
                <div className="image--big" style={{ marginBottom: "-21%" }}>
                  <div
                    className="image--background"
                    style={{ backgroundImage: `url(${props.getUser?.profile?.coverImage})` }}
                  ></div>
                  <img src={`${props.getUser?.profile?.coverImage}`} alt="" className="image--hide" />
                </div>
              </div>
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
                        backgroundImage: `url(${props.getUser?.profile?.avatar})`,
                      }}
                    ></div>
                    <img
                      src={`${props.getUser?.profile?.avatar}`}
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
                <span>{props.getUser?.displayname}</span>
              </div>
              <div className="username">
                <span>@{props.getUser?.username}</span>
              </div>
            </div>
            <div className="bio__info">
              <div className="info">
                <span> {props.getUser?.profile?.story}</span>
              </div>
            </div>
            <div className="bio__join">
              <div className="date-join">
                <span>
                  <DateRangeIcon />
                  Tham gia {formatDate(props.getUser?.createdAt)}
                </span>
              </div>
            </div>
            <div className="bio__follow">
              <div className="bio__follow--item">
                <Link to={`${url}/following`}>
                  <span className="number">{props.getUser?.following?.length}</span>
                  <span className="title">Following</span>
                </Link>
              </div>
              <div className="bio__follow--item">
                <Link to={`${url}/followers`}>
                  <span className="number">{props.getUser?.follower?.length}</span>
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
