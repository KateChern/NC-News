import { useEffect, useState } from "react";
import * as api from "../apis/apis";

const useArticles = (topic, sortValue, order) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .fetchArticles(topic, sortValue, order)
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setIsLoading(false);
      });
  }, [topic, order, sortValue]);

  return { articles, isLoading, error };
};

export default useArticles;
