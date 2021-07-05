import shortid from "shortid";
import { Link, useRouteMatch } from "react-router-dom";

const DrinkItem = ({ id, drink, rate, tags, image }) => {
  const match = useRouteMatch();
  return (
    <li>
      <Link to={`${match.url}/items/${id}`}>
        <img src={image} height={100} alt={drink} />
        <h2>{drink}</h2>
        <p>レーティング: {rate}</p>
        <h3>タグ</h3>
        <ul>
          {tags &&
            tags.map((tag) => {
              return <li key={shortid.generate()}>{tag}</li>;
            })}
        </ul>
      </Link>
    </li>
  );
};

export default DrinkItem;
