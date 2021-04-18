import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { formatDate } from "../../../utils/toErrorMap";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../../utils/useAuth";
import { Follow, useFollowUserMutation, UserQuery } from "../../../generated/graphql";

export const MainPage: React.FC<UserQuery> = (props) => {
  const { url } = useRouteMatch();
  const { openEdit, user,addUser } = useContext(UserContext);
  const [followUser] = useFollowUserMutation();


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
                  style={{
                    backgroundImage: `url(${props.getUser?.profile?.coverImage})`,
                  }}
                ></div>
                <img
                  src={`${props.getUser?.profile?.coverImage}`}
                  alt=""
                  className="image--hide"
                />
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
                        backgroundImage: `url(${
                          props.getUser?.profile?.avatar ||
                          "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                        })`,
                      }}
                    ></div>
                    <img
                      src={`${
                        props.getUser?.profile?.avatar ||
                        "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                      }`}
                      alt=""
                      className="image--hide"
                    />
                  </div>
                </div>
              </div>
              {user.username === props.getUser?.username ? (
                <div className="button">
                  <Button variant="outlined" color="primary" onClick={openEdit}>
                    Edit profile
                  </Button>
                </div>
              ) : (
                <div className="button">
                  {user.following.find(
                    (ele: Follow) => ele.username === props.getUser?.username
                  ) ? (
                    <Button
                      variant="contained"
                      className="btn-follow btn-following"
                      onClick={async () => {
                        const data = await followUser({
                          variables: {
                            username: props.getUser?.username,
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
                            username: props.getUser?.username,
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
                  <span className="number">
                    {props.getUser?.following?.length}
                  </span>
                  <span className="title">Following</span>
                </Link>
              </div>
              <div className="bio__follow--item">
                <Link to={`${url}/followers`}>
                  <span className="number">
                    {props.getUser?.follower?.length}
                  </span>
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
