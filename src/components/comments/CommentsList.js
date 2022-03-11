import React, { useEffect } from "react";
import { useState } from "react";
import * as api from "../../apis/apis";
import CollapseWrapper from "../collapse-wrapper/CollapseWrapper";
import classes from "./Comments.module.css";
import CommentCard from "./CommentCard";

const CommentsList = ({ sent, articleId, user, setCount, toggleMessage }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getComments = () => {
    setIsLoading(true);
    api
      .fetchCommentsById(articleId)
      .then((commentsData) => {
        setComments(commentsData);
        setIsLoading(false);
        setError(null);
      })
      .catch((e) => {
        setError(e.response.data.msg);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getComments();
  }, [articleId, sent]);

  const filterComments = (commentId) => {
    const newComments = comments.filter(
      (comment) => comment.comment_id !== commentId
    );
    setComments(newComments);
  };

  if (comments.length > 0) {
    comments.sort((a, b) =>
      a.comment_id < b.comment_id ? 1 : a.comment_id > b.comment_id ? -1 : 0
    );
  }
  if (isLoading) return <p className={classes.msg}>Loading...</p>;
  if (error) return <p className={classes.msg}>{error}</p>;

  return (
    <article className={classes["comment-section"]}>
      <CollapseWrapper>
        {comments.map((comment) => {
          return (
            <CommentCard
              toggleMessage={toggleMessage}
              onDelete={filterComments}
              key={comment.comment_id}
              comment={comment}
              user={user}
              setCount={setCount}
            />
          );
        })}
      </CollapseWrapper>
    </article>
  );
};

export default CommentsList;
