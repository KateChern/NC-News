import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../../apis/articleApi";
import Moment from "react-moment";
import { FaRegComments } from "react-icons/fa";
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

const ArticleCard = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(defaultArticle);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [article_id]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Article not found</p>;

  return (
    <article className={classes.container}>
      <h3 className={classes.title}>{article.title}</h3>
      <p className={classes.text}>{article.body}</p>
      <dl className={classes.flex}>
        <dt>By {article.author}</dt>
        <dt className={classes.topic}>{article.topic}</dt>
      </dl>
      <dl className={classes.flex}>
        <dt>
          <RiHeart3Line /> {article.votes}
        </dt>
        <dt>
          <FaRegComments /> {article.comment_count}
        </dt>
        <Moment format="YYYY/MM/DD">{article.created_at}</Moment>
      </dl>
    </article>
  );
};
export default ArticleCard;
