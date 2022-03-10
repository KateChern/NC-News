const SortButtons = ({
  onChangeOrder,
  onChangeSortValue,
  order,
  sortValue,
}) => {
  const sortValues = [
    "created_at",
    "title",
    "topic",
    "author",
    "votes",
    "article_id",
  ];
  const orderOptions = ["asc", "desc"];

  const changeSortValueHandler = (e) => {
    onChangeSortValue(e.target.value);
  };
  const changeOrderHandler = (e) => {
    onChangeOrder(e.target.value);
  };
  return (
    <div>
      <select value={sortValue} onChange={changeSortValueHandler}>
        {sortValues.map((el, index) => {
          return <option key={index}>{el}</option>;
        })}
      </select>
      <select value={order} onChange={changeOrderHandler}>
        {orderOptions.map((el, index) => {
          return <option key={index}>{el}</option>;
        })}
      </select>
    </div>
  );
};

export default SortButtons;
