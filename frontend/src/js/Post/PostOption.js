import React from 'react';
import '../../css/PostOption.css';
function PostOption({ Icon, title, color }) {
  return (
    <div className="postOption" style={{ color: color }}>
      {Icon && <Icon />}
      <p>{title}</p>
    </div>
  );
}

export default PostOption;
