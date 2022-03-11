import ArticleCard from "./ArticleCard";
import CommentsList from "../comments/CommentsList";
import NewCommentForm from "../comments/NewCommentForm";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "../modal/Modal";
import classes from "./ArticleCard.module.css";

const ArticlePage = ({ user }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [count, setCount] = useState(0);
  const [sent, setSent] = useState(false);
  const { article_id } = useParams();

  const toggleMessage = () => {
    setShowMessage((prevValue) => !prevValue);
  };
  return (
    <>
      <article className={classes.container}>
        <ArticleCard user={user} toggleMessage={toggleMessage} count={count} />
        <NewCommentForm
          sent={sent}
          setSent={setSent}
          setCount={setCount}
          toggleMessage={toggleMessage}
          articleId={article_id}
          user={user}
        />
        <CommentsList
          toggleMessage={toggleMessage}
          setCount={setCount}
          user={user}
          sent={sent}
          articleId={article_id}
        />
      </article>
      {showMessage && (
        <Modal onClose={toggleMessage}>
          <p className={classes.msg}>
            <Link to={"/auth"}>Login</Link>
          </p>
        </Modal>
      )}
    </>
  );
};

export default ArticlePage;
