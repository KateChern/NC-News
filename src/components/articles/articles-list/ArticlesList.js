import React, { useEffect } from "react";
import classes from "./ArticlesList.module.css";
import ArticleItem from "../article-item/ArticleItem";
import { useState } from "react";
import * as api from "../../../apis/apis";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getArticles = () => {
    setIsLoading(true);
    api
      .fetchArticles()
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <h4 className={classes.header}>All articles</h4>
      <section className={classes.container}>
        {articles.map((article) => (
          <ArticleItem article={article} key={article.article_id} />
        ))}
      </section>
    </>
  );
};

export default ArticleList;
