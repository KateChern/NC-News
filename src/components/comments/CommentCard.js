import Moment from "react-moment";
import classes from "./Comments.module.css";
import { RiHeart3Line } from "react-icons/ri";
import * as api from "../../apis/apis";
import { useState } from "react";
import deleteIcon from "../../icons/deleteIcon.svg";

const CommentCard = ({ comment, user, setCount, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteComment = (comment) => {
    setIsLoading(true);
    api
      .deleteComment(comment.comment_id)
      .then((response) => {
        onDelete(comment.comment_id);
        setCount((currentValue) => currentValue - 1);
        setIsLoading(false);
        setError(null);
      })
      .catch((e) => {
        setCount(0);
        setError(e.response.data.msg);
        setIsLoading(false);
      });
  };

  return (
    <section>
      <p className={classes.author}>{comment.author}</p>
      <div className={classes["comment-body"]}>
        <p className={classes.text}>{comment.body}</p>
        <dl className={classes.flex}>
          <dt>
            <RiHeart3Line /> {comment.votes}
          </dt>
          <Moment format="YYYY/MM/DD">{comment.created_at}</Moment>
          <dt>
            <button
              className={
                user !== comment.author
                  ? classes.hidden
                  : `${classes.btn} ${classes["btn-light"]}`
              }
              onClick={() => user === comment.author && deleteComment(comment)}
            >
              delete
            </button>
            {isLoading && <p>Loading</p>}
            {error && <p>{error}</p>}
          </dt>
        </dl>
      </div>
      <div className={classes.border}></div>
    </section>
  );
};

export default CommentCard;
