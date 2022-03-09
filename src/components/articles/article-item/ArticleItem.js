import { Link } from "react-router-dom";
import classes from "../articles-list/ArticlesList.module.css";
import { FaRegComments } from "react-icons/fa";
import { RiHeart3Line } from "react-icons/ri";
import Moment from "react-moment";

const ArticleItem = ({ article }) => {
  const title = article.title.toLowerCase();
  const newTitle = title[0].toUpperCase() + title.slice(1, -1);

  return (
    <article className={classes.article}>
      <Link
        className={classes["article-body"]}
        to={`/articles/${article.article_id}`}
      >
        <h4 className={classes.title}>{newTitle}</h4>
        <dl className={classes.text}>
          <dt className={classes.topic}>Topic: {article.topic}</dt>
          <dt className={classes.author}>By {article.author}</dt>
        </dl>
        <dl className={classes["flex-row"]}>
          <dt>
            <RiHeart3Line /> {article.votes}
          </dt>
          <dt>
            <FaRegComments /> {article.comments_count}
          </dt>
          <Moment format="YYYY/MM/DD">{article.created_at}</Moment>
        </dl>
      </Link>
    </article>
  );
};
export default ArticleItem;
