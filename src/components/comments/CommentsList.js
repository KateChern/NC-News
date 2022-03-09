import React, { useEffect } from "react";
import { useState } from "react";
import * as api from "../../apis/apis";
import CollapseWrapper from "../collapse-wrapper/CollapseWrapper";
import Moment from "react-moment";
import classes from "./Comments.module.css";
import { RiHeart3Line } from "react-icons/ri";

const CommentsList = ({ articleId }) => {
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
  }, [articleId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <CollapseWrapper>
        {comments.map((comment) => {
          return (
            <article key={comment.comment_id}>
              <p>{comment.body}</p>
              <p>{comment.author}</p>
              <dl className={classes.flex}>
                <dt>
                  <RiHeart3Line /> {comment.votes}
                </dt>
                <Moment format="YYYY/MM/DD">{comment.created_at}</Moment>
              </dl>
              <p>{comment.votes}</p>
              <p>{comment.created_at}</p>
            </article>
          );
        })}
      </CollapseWrapper>
    </>
  );
};

export default CommentsList;
