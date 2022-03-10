import axios from "axios";

const api = axios.create({
  baseURL: "https://northcoders-news-b-end.herokuapp.com/api",
});

export const fetchArticles = (topic, sort_by, order) => {
  return api
    .get(`/articles`, { params: { topic, sort_by, order } })
    .then((res) => {
      return res.data.articles;
    });
};

export const fetchArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const fetchTopics = () => {
  return api.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};

export const fetchCommentsById = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const fetchUsers = () => {
  return api.get(`/users`).then((res) => {
    return res.data.users;
  });
};

export const patchVotesOnArticle = (article_id, inc_votes) => {
  return api.patch(`/articles/${article_id}`, { inc_votes }).then((res) => {
    return res.data.article;
  });
};

export const postComment = (article_id, comment) => {
  return api
    .post(`/articles/${article_id}/comments`, { ...comment })
    .then((res) => {
      return res.data.comment;
    });
};
