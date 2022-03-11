import React, { useEffect } from "react";
import { useState } from "react";
import * as api from "../../apis/apis";
import CollapseWrapper from "../collapse-wrapper/CollapseWrapper";
import classes from "./Comments.module.css";
import CommentCard from "./CommentCard";

const CommentsList = ({ sent, articleId, count, user, setCount }) => {
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
    console.log("sjfhgv");
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
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  // const newCount = +commentsCount + count;
  return (
    <article className={classes["comment-section"]}>
      {/* <p className={classes.count}>{newCount} COMMENTS</p> */}
      <CollapseWrapper>
        {comments.map((comment) => {
          return (
            <CommentCard
              comments={comments}
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
