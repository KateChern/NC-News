import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../../apis/apis";
import classes from "./FilterBar.module.css";

const FilterBar = () => {
  const [allTopics, setAllTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllTopics = () => {
    api
      .fetchTopics()
      .then((data) => {
        setAllTopics(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getAllTopics();
  }, []);
  if (isLoading) return <p className={classes.msg}>Loading...</p>;
  if (error) return <p className={classes.msg}>{error} </p>;
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
