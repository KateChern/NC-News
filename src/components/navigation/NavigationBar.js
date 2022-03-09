import { Link } from "react-router-dom";

import classes from "./NavigationBar.module.css";

const NavigationBar = ({ user }) => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <h1 className={classes.logo}>NC News</h1>
      </Link>
      <nav>
        {!user ||
          (user === "lurker" && (
            <Link to="/auth" className={classes.link}>
              <p className={classes.login}>Login</p>
            </Link>
          ))}
        {user && user !== "lurker" && (
          <Link to="/auth" className={classes.link}>
            {" "}
            <p>logged in as {user}</p>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavigationBar;
