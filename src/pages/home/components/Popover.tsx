import { Avatar, Link } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DoneIcon from "@material-ui/icons/Done";
import React, { useContext } from "react";
import { UserContext } from "../../../utils/useAuth";

export const Popover: React.FC<{}> = () => {
  const {logout} = useContext(UserContext);

  return (
    <div className="popover__wrap">
      <div className="popover__wrap--child">
        <div className="popover">
          <ArrowDropDownIcon
            className="popover__arrow"
            color="inherit"
            fontSize="large"
          />
          <div className="popover__info">
            <ul className="popover__info--pad">
              <li>
                <div className="sidebar__profile">
                  <div className="sidebar__profile--button">
                    <div className="button">
                      <div className="avatar">
                        <Avatar src="" />
                      </div>
                      <div className="info">
                        <div className="displayname">
                          <span>DEMO ALK</span>
                        </div>
                        <div className="username">
                          <span>@asdasd</span>
                        </div>
                      </div>
                      <div className="dot">
                        <DoneIcon className="done"/>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li onClick={logout}>
                <Link href="/logout" className="popover__info--link">
                  <div className="popover__info--link--item">Log out <span style={{marginLeft: '5px'}}>@asdasd</span></div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
