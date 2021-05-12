import { Avatar, Button } from "@material-ui/core";
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import NotificationsNoneIcon from "@material-ui/icons/Notifications";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import TwitterIcon from "@material-ui/icons/Twitter";
import StorefrontIcon from '@material-ui/icons/Storefront';
import { useContext, useState } from "react";
import { UserContext } from "../../../utils/useAuth";
import { Popover } from "./Popover";
import SidebarOption from "./SidebarOption";

function Sidebar(props: any) {
  const [popState, setPopState] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="sidebar">
      <TwitterIcon />

      <SidebarOption href="/home" Icon={HomeIcon} text="Home" />
      <SidebarOption href="/market/all" Icon={StorefrontIcon} text="Marketplace" />
      <SidebarOption href="/notifications" Icon={NotificationsNoneIcon} text="Notifications"/>
      <SidebarOption href="/messages" Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption href="/groups" Icon={GroupIcon} text="Groups" />
      <SidebarOption href="/lists" Icon={ListAltIcon} text="Lists" />
      <SidebarOption href={`/users/${user.username}`} Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption href="/more" Icon={MoreHorizIcon} text="More" />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>

      <div className="sidebar__profile" onClick={() => setPopState(!popState)}>
        <div className="sidebar__profile--button">
          <div className="button">
            <div className="avatar">
              <Avatar src={props.profile?.avatar || ""} />
            </div>
            <div className="info">
              <div className="displayname">
                <span>{props.displayname}</span>
              </div>
              <div className="username">
                <span>@{props.username}</span>
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
