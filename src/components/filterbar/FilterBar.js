import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../../apis/articleApi";
import classes from "./FilterBar.module.css";

const FilterBar = ({ onChangeTopic, onChangeOrder, onChangeSortValue }) => {
  const orderOptions = ["asc", "desc"];
  const [allTopics, setAllTopics] = useState([]);
  const sortValues = [
    "created_at",
    "title",
    "topic",
    "author",
    "votes",
    "article_id",
  ];

  const changeTopicHandler = (e) => {
    onChangeTopic(e.target.value);
  };
  const changeSortValueHandler = (e) => {
    onChangeSortValue(e.target.value);
  };
  const changeOrderHandler = (e) => {
    onChangeOrder(e.target.value);
  };
  const getAllTopics = () => {
    api.fetchTopics().then((data) => {
      setAllTopics(data);
    });
  };
  useEffect(() => {
    getAllTopics();
  }, []);

  return (
    <div className={classes["topics-container"]}>
      <Link to={"/"}>
        <p className={classes.link}>All Articles</p>
      </Link>
      <ul className={classes["topics-list"]}>
        {allTopics.map(({ slug }) => {
          return (
            <li key={slug}>
              <Link to={`/topics/${slug}/articles`}> {slug}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterBar;
