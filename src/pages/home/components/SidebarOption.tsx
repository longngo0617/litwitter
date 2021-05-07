import { NavLink } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
function SidebarOption({ href, text, Icon }: any) {
  return (
    <NavLink to={href} className="link" activeClassName="sidebarOption--active">
      <div className={`sidebarOption `}>
        {text === "Notifications" ? (
          <div style={{ padding: "20px" }}>
            <Badge color="secondary" variant="dot">
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
