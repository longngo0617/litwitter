import React, { useContext } from "react";
import { useHistory } from "react-router";
import { WithSide } from "../../components/WithSide";
import { useIsAuth } from "../../utils/useIsAuth";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UserContext } from "../../utils/useAuth";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  useIsAuth();
  const router = useHistory();
  const { user } = useContext(UserContext);

  return (
    <div className="wrapper">
      <WithSide>
        <div className="feed">
          <div className="feed__header">
            <ArrowBackIcon
              className="feed__header--icon"
              onClick={() => router.replace("/")}
            />
            <h2>{user.displayname}</h2>
          </div>

          <div className="profile__wrapper">
            <div className="profile__wrapper">
              <div className="profile__wrapper profile__top">
                <div className="profile__top--cover none-background">
                  <div className="full-width overflow block" style={{ paddingBottom: "33.3333%" }}></div>
                  <div className="cover-image"></div>
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
                    <div className="bio__avatar"></div>
                    <div className="bio__name"></div>
                    <div className="bio__info"></div>
                    <div className="bio__join"></div>
                    <div className="bio__follow"></div>
                </div>
              </div>
              <div className="profile__nav"></div>
              <div className="profile__bottom"></div>
            </div>
          </div>
        </div>
      </WithSide>
    </div>
  );
};
