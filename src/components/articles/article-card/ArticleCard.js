import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as api from "../../../apis/apis";
import Moment from "react-moment";
import { RiHeart3Line } from "react-icons/ri";
import { GoComment } from "react-icons/go";
import classes from "./ArticleCard.module.css";
import CommentsList from "../../comments/CommentsList";
import Modal from "../../modal/Modal";
import NewCommentForm from "../../comments/NewCommentPost";

const defaultArticle = {
  article_id: 1,
  title: "Loading...",
  topic: "Loading...",
  author: "Loading...",
  body: "Loading...",
  created_at: "Loading...",
  votes: 0,
  comment_count: "0",
};

const ArticleCard = ({ user }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(defaultArticle);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votesError, setVotesError] = useState(null);
  const [votesCount, setVotesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [commentsBtnHighlighted, setCommentsBtnHighlighted] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const getArticleByIdHandler = () => {
    setIsLoading(true);
    api
      .fetchArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setError(null);
      })
      .catch((e) => {
        setError(e);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getArticleByIdHandler();
    setVotesCount(article.votes);
  }, [article_id, article.votes, article]);

  const toggleMessage = () => {
    setShowMessage((prevValue) => !prevValue);
  };
  const toggleShowCommentForm = () => {
    setShowCommentForm((show) => !show);
  };

  //optimistic rendering votes
  const handleVotesIncClick = () => {
    //setting the value to update votes depending on user status
    let incValue = !user || user === "lurker" ? 0 : user && isLiked ? -1 : 1;
    setVotesCount((currCount) => currCount + incValue);
    setVotesError(null);

    // updating votes in the db
    api.patchVotesOnArticle(article_id, incValue).catch((error) => {
      setVotesCount((currCount) => currCount - 1);
      setVotesError("Something went wrong, please try again.");
    });

    setIsLiked((prevValue) => !prevValue);
    //setting BtnIsHighlighted to true to upodate the class name and add animation to the ckick action
    setBtnIsHighlighted(true);

    setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 100);

    //checking if user has logged in in order to be able to vote
    // and to send the modal message and redirect to login page
    !user || (user === "lurker" && toggleMessage());
  };
  // setting classname on click when posted a new comment
  const onAddNewComment = () => {
    setCommentsBtnHighlighted(true);
    setTimeout(() => {
      setCommentsBtnHighlighted(false);
    }, 100);
  };
  const commentBtnClasses = ` ${commentsBtnHighlighted ? classes.bump : ""}`;
  const btnClasses = `${btnIsHighlighted ? classes.bump : ""}`;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Article not found</p>;
  if (votesError) return <p>{votesError}</p>;

  return (
    <>
      <article className={classes.container}>
        <h3 className={classes.title}>{article.title}</h3>
        <p className={classes.text}>{article.body}</p>
        <dl className={classes.details}>
          <dt>By {article.author}</dt>
          <dt className={classes.topic}>{article.topic}</dt>
        </dl>
        <div className={classes.flex}>
          <dl className={classes.action}>
            <dt className={btnClasses} onClick={handleVotesIncClick}>
              <RiHeart3Line /> {votesCount}
            </dt>
            <dt className={commentBtnClasses} onClick={toggleShowCommentForm}>
              <GoComment /> {article.comment_count}
            </dt>
          </dl>
          <Moment format="YYYY/MM/DD">{article.created_at}</Moment>
        </div>
        <NewCommentForm
          toggleMessage={toggleMessage}
          onAddNewComment={onAddNewComment}
          articleId={article_id}
          user={user}
          showCommentForm={showCommentForm}
        />
        <CommentsList
          commentsCount={article.comment_count}
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
export default ArticleCard;
