import React from "react";

const IconOption = ({background, Icon, color, object, mouseEnter, mouseLeave } : any) => {
  return (
    <div
      className={`post__footer--item ${background === color && color}`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className="post__footer--wrapIcon">
        <div className="post__footer--blur"></div>
        <Icon fontSize="small" className="post__footer--icon" />
      </div>
      <div className="post__footer--number">{object}</div>
    </div>
  );
};

export default IconOption;
