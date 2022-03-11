import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../apis/apis";
import Moment from "react-moment";
import { RiHeart3Line } from "react-icons/ri";
import classes from "./ArticleCard.module.css";

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

const ArticleCard = ({ user, toggleMessage, count }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(defaultArticle);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votesError, setVotesError] = useState(null);
  const [votesCount, setVotesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const getArticleByIdHandler = () => {
    setIsLoading(true);
    api
      .fetchArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setError(null);
        setVotesCount(articleData.votes);
      })
      .catch((e) => {
        setError(e);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getArticleByIdHandler();
  }, [article_id]);

  const handleVotesIncClick = () => {
    let incValue = !user || user === "lurker" ? 0 : user && isLiked ? -1 : 1;
    setVotesCount((currCount) => currCount + incValue);
    setVotesError(null);

    api.patchVotesOnArticle(article_id, incValue).catch((error) => {
      setVotesCount((currCount) => currCount - 1);
      console.log("roor");
      setVotesError("Something went wrong, please try again.");
    });

    setIsLiked((prevValue) => !prevValue);
    setBtnIsHighlighted(true);

    setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 1000);

    !user || (user === "lurker" && toggleMessage());
  };

  const btnClasses = `${btnIsHighlighted ? classes.bump : ""}`;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Article not found</p>;
  if (votesError) return <p>{votesError}</p>;

  const newCount = +article.comment_count + count;
  return (
    <>
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
        </dl>
        <Moment format="YYYY/MM/DD">{article.created_at}</Moment>
      </div>
      <p className={classes.count}>{newCount} COMMENTS</p>
    </>
  );
};
export default ArticleCard;
