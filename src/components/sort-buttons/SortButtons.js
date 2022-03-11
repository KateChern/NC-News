import classes from "../comments/Comments.module.css";

const SortButtons = ({
  onChangeOrder,
  onChangeSortValue,
  order,
  sortValue,
}) => {
  const sortValues = ["created_at", "title", "author", "votes", "article_id"];
  const orderOptions = ["asc", "desc"];

  const changeSortValueHandler = (e) => {
    onChangeSortValue(e.target.value);
  };
  const changeOrderHandler = (e) => {
    onChangeOrder(e.target.value);
  };

  return (
    <div>
      <select
        className={`${classes.btn} ${classes["btn-light"]}`}
        value={sortValue}
        onChange={changeSortValueHandler}
      >
        {sortValues.map((el, index) => {
          return <option key={index}>{el}</option>;
        })}
      </select>
      <select
        className={`${classes.btn} ${classes["btn-light"]}`}
        value={order}
        onChange={changeOrderHandler}
      >
        {orderOptions.map((el, index) => {
          return <option key={index}>{el}</option>;
        })}
      </select>
    </div>
  );
};

export default SortButtons;
