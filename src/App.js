import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navigation/NavigationBar";

function App() {
  return (
    <Router>
      <NavigationBar />
    </Router>
  );
}

export default App;
