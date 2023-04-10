import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

import styles from "./Comment.scss";

const Comment = () => {
  return (
    <div className="row comment-wrapper">
      <div className="col-12 d-flex align-items-center gap-15">
        <div className="comment-avatar-user">
          <FaRegUserCircle />
        </div>
        <div className="comment-main">
          <div className="comment-main__author-name">Phạm Văn Đạt</div>
          <div className="comment-main__time">2023-04-10 20:10</div>
          <div className="comment-main__content">
            Rất tốt ! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Tempora alias ipsa magni fugit assumenda cumque praesentium quia
            nesciunt quae molestiae deserunt odio dolores enim exercitationem,
            eius possimus! Cum, iure nemo.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
