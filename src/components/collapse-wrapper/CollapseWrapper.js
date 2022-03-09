import { useState } from "react";

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
        <button onClick={handleClick}>
          {isVisible ? "Hide comments" : "Show more comments"}
        </button>
      )}
    </>
  );
};

export default CollapseWrapper;
