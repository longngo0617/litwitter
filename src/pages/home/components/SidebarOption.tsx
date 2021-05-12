import { NavLink } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { useContext } from "react";
import { UserContext } from "../../../utils/useAuth";

function SidebarOption({ href, text, Icon }: any) {
  const { notiState,setNotiTrue } = useContext(UserContext);
  
  return (
    <NavLink to={href} className="link" activeClassName="sidebarOption--active">
      <div className={`sidebarOption `} onClick={setNotiTrue}>
        {text === "Notifications" ? (
          <div style={{ padding: "20px" }}>
            <Badge color="secondary" variant="dot" invisible={notiState}>
              <Icon />
            </Badge>
          </div>
        ) : (
          <Icon />
        )}
        <h2>{text}</h2>
      </div>
    </NavLink>
  );
}

export default SidebarOption;
