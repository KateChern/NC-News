import "./App.css";
import "bootswatch/dist/slate/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavigationBar from "./components/navigation/NavigationBar";
import ArticleList from "./components/articles/articles-list/ArticlesList";
import ArticleCard from "./components/articles/article-card/ArticleCard";
import FilterBar from "./components/filterbar/FilterBar";
import FilteredArticlesList from "./components/articles/filtered-articles/FilteredArticles";

function App() {
  const [topic, setTopic] = useState({
    slug: "football",
    description: "Footie!",
  });
  const [order, setOrder] = useState("asc");
  const [sortValue, setSortValue] = useState("title");

  const onChangeTopic = (newTopicValue) => {
    setTopic(newTopicValue);
  };
  const onChangeOrder = (newOrder) => {
    setOrder(newOrder);
  };
  const onChangeSortValue = (newSortValue) => {
    setSortValue(newSortValue);
  };

  return (
    <Router>
      <NavigationBar />
      <FilterBar
        topic={topic}
        order={order}
        sortValue={sortValue}
        onChangeTopic={onChangeTopic}
        onChangeOrder={onChangeOrder}
        onChangeSortValue={onChangeSortValue}
      />
      <div className="App">
        <Routes>
          <Route path="/" exact element={<ArticleList />} />
          <Route
            path="/topics/:topic/articles"
            exact
            element={<FilteredArticlesList />}
          />
          <Route path="/articles/:article_id" exact element={<ArticleCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
