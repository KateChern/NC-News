import { Link } from "react-router-dom";

import classes from "./NavigationBar.module.css";

const NavigationBar = ({ user }) => {
  return (
    <header className={classes.header}>
      <Link className={classes.link} to="/articles">
        <h1 className={classes.logo}>NC News</h1>
      </Link>
      <nav>
        {user && <p>logged in as {user}</p>}
        {!user && (
          <Link to="/auth" className={classes.link}>
            <p className={classes.login}>Login</p>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavigationBar;
