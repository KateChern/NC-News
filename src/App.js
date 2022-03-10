import "./App.css";
import "bootswatch/dist/slate/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavigationBar from "./components/navigation/NavigationBar";
import ArticleList from "./components/articles/articles-list/ArticlesList";
import ArticleCard from "./components/articles/article-card/ArticleCard";
import FilterBar from "./components/filterbar/FilterBar";
import FilteredArticlesList from "./components/articles/filtered-articles/FilteredArticles";
import AuthForm from "./components/auth/AuthForm";

function App() {
  const [order, setOrder] = useState("asc");
  const [sortValue, setSortValue] = useState("title");
  const [user, setUser] = useState("lurker");

  const onChangeOrder = (newOrder) => {
    setOrder(newOrder);
  };
  const onChangeSortValue = (newSortValue) => {
    setSortValue(newSortValue);
  };
  const onChangeUser = (newUser) => {
    setUser(newUser);
  };
  return (
    <Router>
      <NavigationBar user={user} />
      <FilterBar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ArticleList
                order={order}
                sortValue={sortValue}
                onChangeOrder={onChangeOrder}
                onChangeSortValue={onChangeSortValue}
              />
            }
          />
          <Route
            path="/auth"
            exact
            element={<AuthForm onChangeUser={onChangeUser} user={user} />}
          />
          <Route
            path="/topics/:topic/articles"
            exact
            element={
              <FilteredArticlesList
                order={order}
                sortValue={sortValue}
                onChangeOrder={onChangeOrder}
                onChangeSortValue={onChangeSortValue}
              />
            }
          />
          <Route
            path="/articles/:article_id"
            exact
            element={<ArticleCard user={user} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
