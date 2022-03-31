import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../../apis/apis";
import classes from "./FilterBar.module.css";
import Skeleton from "react-loading-skeleton";
const FilterBar = () => {
  const [allTopics, setAllTopics] = useState([]);
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const getAllTopics = () => {
    // setIsLoading(true);
    api
      .fetchTopics()
      .then((data) => {
        setAllTopics(data);
        setError(null);
        // setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        // setIsLoading(false);
      });
  };
  useEffect(() => {
    getAllTopics();
  }, []);
  // if (isLoading)
  //   return (
  //     <div className={classes["topics-container"]}>
  //       {" "}
  //       <Skeleton height={260} />{" "}
  //     </div>
  //   );
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
