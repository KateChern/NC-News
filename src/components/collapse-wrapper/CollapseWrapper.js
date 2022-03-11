import { useState } from "react";
import classes from "../comments/Comments.module.css";

const CollapseWrapper = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible((currentVisibility) => !currentVisibility);
  };
  return (
    <>
      {isVisible && children}
      {children.length > 0 && children[0]}
      {children.length > 0 && (
        <a role="button" className={classes.collapseBtn} onClick={handleClick}>
          {isVisible ? "Hide comments" : "Show more comments"}
        </a>
      )}
    </>
  );
};

export default CollapseWrapper;
