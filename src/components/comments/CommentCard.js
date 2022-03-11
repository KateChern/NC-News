import Moment from "react-moment";
import classes from "./Comments.module.css";
import { RiHeart3Line } from "react-icons/ri";
import * as api from "../../apis/apis";
import { useEffect, useState } from "react";

const CommentCard = ({ comment, user, setCount, onDelete, toggleMessage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [votesCount, setVotesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

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
  useEffect(() => {
    setVotesCount(comment.votes);
  }, []);

  const handleVotesIncClick = () => {
    let incValue = !user || user === "lurker" ? 0 : user && isLiked ? -1 : 1;
    setVotesCount((currCount) => currCount + incValue);

    api.patchVotesOnComment(comment.comment_id, incValue).catch((error) => {
      setVotesCount((currCount) => currCount - 1);
    });

    setIsLiked((prevValue) => !prevValue);
    setBtnIsHighlighted(true);

    setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 1000);

    !user || (user === "lurker" && toggleMessage());
  };
  const btnClasses = `${btnIsHighlighted ? classes.bump : ""}`;
  return (
    <section className={classes.container}>
      <p className={classes.author}>{comment.author}</p>
      <div className={classes["comment-body"]}>
        <p className={classes.text}>{comment.body}</p>
        <dl className={classes.flex}>
          <dt className={classes.details}>
            <div className={btnClasses} onClick={handleVotesIncClick}>
              <RiHeart3Line /> {votesCount}{" "}
            </div>

            <Moment format="YYYY/MM/DD">{comment.created_at}</Moment>
          </dt>
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
          </dt>
        </dl>
        {isLoading && <p>Loading</p>}
        {error && <p>{error}</p>}
      </div>
      <div className={classes.border}></div>
    </section>
  );
};

export default CommentCard;
