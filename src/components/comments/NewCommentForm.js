import { useEffect, useState } from "react";
import * as api from "../../apis/apis";
import { BiSend } from "react-icons/bi";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = ({
  articleId,
  user,
  onAddNewComment,
  showCommentForm,
  toggleMessage,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const isValid = commentText.trim() != "";

  const onCommentChange = (e) => {
    setCommentText(e.target.value);
    setIsTouched(true);
  };

  useEffect(() => {
    isTouched && (!user || user === "lurker") && toggleMessage();
  }, [commentText]);

  const newComment = {
    username: user,
    body: commentText,
  };

  const onPostCommentHandler = () => {
    setIsLoading(true);
    api
      .postComment(articleId, newComment)
      .then((commentData) => {
        setIsLoading(false);
        setError(null);
        setSent(true);
      })
      .catch((err) => {
        setError("Your comment hasn't been sent, Login and try again");
        setIsLoading(false);
        setSent(false);
        console.log(error);
      });
  };
  const timer = () => {
    setTimeout(() => {
      setSent(false);
    }, 2000);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!isValid) return;
    onPostCommentHandler();
    onAddNewComment();
    setCommentText("");
    setIsTouched(false);
    timer();
  };

  const formClasses = ` ${showCommentForm ? classes.form : classes.hiden}`;

  return (
    <form className={formClasses} onSubmit={submitHandler}>
      <input required value={commentText} onChange={onCommentChange} />
      <button>
        <BiSend />
      </button>
      {isLoading && <p>Loading...</p>}
      {sent && <p>Comment sent</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default NewCommentForm;
