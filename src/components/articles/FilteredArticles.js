import React from "react";
import classes from "./ArticlesList.module.css";
import ArticleItem from "./ArticleItem";
import { useParams } from "react-router-dom";
import SortButtons from "../sort-buttons/SortButtons";
import useArticles from "../../hooks/hooks";

const FilteredArticlesList = ({
  order,
  sortValue,
  onChangeOrder,
  onChangeSortValue,
}) => {
  const { topic } = useParams();

  const { articles, isLoading, error } = useArticles(topic, sortValue, order);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error} </p>;

  return (
    <>
      <h4 className={classes.header}>Articles related to {topic} </h4>
      <SortButtons
        order={order}
        sortValue={sortValue}
        onChangeOrder={onChangeOrder}
        onChangeSortValue={onChangeSortValue}
      />
      <section className={classes.container}>
        {articles.map((article) => (
          <ArticleItem article={article} key={article.article_id} />
        ))}
      </section>
    </>
  );
};

export default FilteredArticlesList;
