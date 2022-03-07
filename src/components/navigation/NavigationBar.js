import { Link } from "react-router-dom";

import classes from "./NavigationBar.module.css";

const NavigationBar = ({ user }) => {
  return (
    <header className={classes.header}>
      <Link to="/articles">
        <h1 className={classes.logo}>NC News</h1>
      </Link>
      <nav>
        {user && <p>logged in as {user}</p>}
        {!user && (
          <Link to="/auth">
            <div className={classes.login}>Login</div>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavigationBar;
