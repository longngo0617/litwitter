import React from "react";

function SidebarOption({active,text,Icon}:any) {
  return (
    <div>
      <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
        <Icon />
        <h2>{text}</h2>
      </div>
    </div>
  );
}

export default SidebarOption;
