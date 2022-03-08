import "./App.css";
import "bootswatch/dist/slate/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavigationBar from "./components/navigation/NavigationBar";
import ArticleList from "./components/articles/articles-list/ArticlesList";
import * as api from "./apis/articleApi";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="App">
        <Routes>
          <Route path="/articles" exact element={<ArticleList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
