import { Link } from "react-router-dom";

const MemoListItem = ({ memo, id, date, drinkId }) => {
  return (
    <li>
      <h3>{date}</h3>
      <p>{memo}</p>
      <Link to={`/edit/${drinkId}/${id}`}>編集</Link>
      <button>削除</button>
    </li>
  );
};

export default MemoListItem;
