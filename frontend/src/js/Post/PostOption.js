import React from "react";
import "../../css/PostOption.css";
function PostOption({ Icon, title, color, backgroundColor, onClick }) {
  return (
    <div
      className="postOption"
      style={{ color: color, backgroundColor: backgroundColor }}
      onClick={onClick}
    >
      {Icon && <Icon />}
      <p>{title}</p>
    </div>
  );
}

export default PostOption;
