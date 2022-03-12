import { useEffect, useState } from "react";
import * as api from "../../apis/apis";
import classes from "./NewCommentForm.module.css";
import sendCommentIcon from "../../icons/sendIcon.svg";

const NewCommentForm = ({
  articleId,
  user,
  toggleMessage,
  setCount,
  setSent,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isValid = commentText.trim() !== "";

  const onCommentChange = (e) => {
    setCommentText(e.target.value);
    setIsTouched(true);
  };

  useEffect(() => {
    isTouched && (!user || user === "lurker") && toggleMessage();
  }, [commentText]); // eslint-disable-line react-hooks/exhaustive-deps

  const newComment = {
    username: user,
    body: commentText,
  };

  const onPostCommentHandler = () => {
    setIsLoading(true);
    setSent(false);
    api
      .postComment(articleId, newComment)
      .then((commentData) => {
        setCount((prevValue) => prevValue + 1);
        setIsLoading(false);
        setError(null);
        setSent(true);
      })
      .catch((err) => {
        setError("Your comment hasn't been sent, login and try again");
        setIsLoading(false);
        setSent(false);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isValid) return;

    onPostCommentHandler();
    setCommentText("");
    setIsTouched(false);
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div>
          <input
            placeholder="New Comment"
            required
            value={commentText}
            onChange={onCommentChange}
          />
          <img
            type="button"
            onClick={submitHandler}
            src={sendCommentIcon}
            alt="send comment Icon"
          />
        </div>
      </form>
    </div>
  );
};

export default NewCommentForm;
