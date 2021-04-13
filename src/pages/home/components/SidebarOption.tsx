import { NavLink } from "react-router-dom";

function SidebarOption({href,text,Icon}:any) {
  return (
    <NavLink to="" className="link" activeClassName="sidebarOption--active">
      <div className={`sidebarOption`}>
        <Icon />
        <h2>{text}</h2>
      </div>
    </NavLink>
  );
}

export default SidebarOption;
