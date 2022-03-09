import React, { useEffect } from "react";
import classes from "../../articles/articles-list/ArticlesList.module.css";
import ArticleItem from "../article-item/ArticleItem";
import { useState } from "react";
import * as api from "../../../apis/apis";
import { useParams } from "react-router-dom";

const FilteredArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams();

  const getArticles = () => {
    setIsLoading(true);
    api
      .fetchArticles(topic)
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getArticles();
  }, [topic]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error} </p>;
  return (
    <>
      <h4 className={classes.header}>Articles related to {topic} </h4>
      <section className={classes.container}>
        {articles.map((article) => (
          <ArticleItem article={article} key={article.article_id} />
        ))}
      </section>
    </>
  );
};

export default FilteredArticlesList;
