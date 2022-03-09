import React, { useEffect } from "react";
import classes from "./ArticlesList.module.css";
import ArticleItem from "../article-item/ArticleItem";
import { useState } from "react";
import * as api from "../../../apis/articleApi";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getArticles = () => {
    api
      .fetchArticles()
      .then((articlesData) => {
        setArticles(articlesData);
      })
      .catch((e) => {
        setError(e);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles();
    setIsLoading(false);
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>No articles found, try again later</p>;
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
