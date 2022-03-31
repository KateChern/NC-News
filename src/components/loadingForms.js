import React from "react";
import Skeleton from "react-loading-skeleton";
import classes from "./articles/ArticlesList.module.css";
const SkeletonCard = () => {
  return (
    <section className={classes.container}>
      {Array(9)
        .fill()
        .map((item, index) => (
          <article className={classes.article} key={index}>
            <div className={classes["article-body"]}>
              <h4 className={classes.title}>
                <Skeleton width={"370px"} />
              </h4>

              <p className={classes.text}>
                <Skeleton height={260} />
              </p>
              <dl className={classes["flex-row"]}>
                <Skeleton height={260} />
              </dl>
            </div>
          </article>
        ))}
    </section>
  );
};
export default SkeletonCard;
