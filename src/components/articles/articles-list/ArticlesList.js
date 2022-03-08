import React, { useEffect } from "react";
import classes from "./ArticlesList.module.css";
import ArticleItem from "../article-item/ArticleItem";
import { useState } from "react";
import * as api from "../../../apis/articleApi";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const getArticles = () => {
    api.fetchArticles().then((articlesData) => {
      console.log(articlesData);
      setArticles(articlesData);
    });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <section className={classes.container}>
      {articles.map((article) => (
        <ArticleItem article={article} key={article.article_id} />
      ))}
    </section>
  );
};

export default ArticleList;
