import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

import styles from "./Comment.scss";

const Comment = ({id, comment, createdAt, user, userAvatar}) => {
  return (
    <div className="row comment-wrapper">
      <div className="col-12 d-flex align-items-center gap-15">
        <div className="comment-avatar-user">
          <FaRegUserCircle />
        </div>
        <div className="comment-main">
          <div className="comment-main__author-name">{user}</div>
          <div className="comment-main__time">{createdAt}</div>
          <div className="comment-main__content">
            {comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
