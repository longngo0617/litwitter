import { Avatar, Button } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import NotificationsNoneIcon from "@material-ui/icons/Notifications";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SearchIcon from "@material-ui/icons/Search";
import TwitterIcon from "@material-ui/icons/Twitter";
import React, { useState } from "react";
import { Popover } from "./Popover";
import SidebarOption from "./SidebarOption";

function Sidebar({ username, displayname }: any) {
  const [popState,setPopState] = useState(false);
  return (
    <div className="sidebar">
      <TwitterIcon />

      <SidebarOption active Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Explore" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Lists" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>

      <div className="sidebar__profile" onClick={() => setPopState(!popState)}>
        <div className="sidebar__profile--button">
          <div className="button">
            <div className="avatar">
              <Avatar src="" />
            </div>
            <div className="info">
              <div className="displayname">
                <span>{displayname}</span>
              </div>
              <div className="username">
                <span>@{username}</span>
              </div>
            </div>
            <div className="dot">
              <MoreHorizIcon />
            </div>
          </div>
        </div>
      </div>

      {popState && <Popover />}
      

    </div>
  );
}

export default Sidebar;
