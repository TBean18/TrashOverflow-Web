import React from 'react';
import '../../css/PostOption.css';
function PostOption({ Icon, title, color, backgroundColor }) {
  return (
    <div className="postOption" style={{ color: color, backgroundColor: backgroundColor }}>
      {Icon && <Icon />}
      <p>{title}</p>
    </div>
  );
}

export default PostOption;
