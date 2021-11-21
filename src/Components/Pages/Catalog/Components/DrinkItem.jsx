import { nanoid } from "nanoid";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";

export const FCDrinkItem = ({ id, drink, rate, tags, image, className }) => {
  const match = useRouteMatch();
  return (
    <div className={className}>
      <li className={`${className}__list`}>
        <Link to={`${match.url}/items/${id}`} className={`${className}__link`}>
          <img src={image} alt={drink} className={`${className}__img`} />
          <div className={`${className}__desc`}>
            <h2 className={`${className}__title`}>{drink}</h2>
            <Rating
              className={`${className}__rate`}
              name="rate"
              value={rate}
              readOnly
            />
            <ul className={`${className}__tags`}>
              {tags &&
                tags.map((tag) => {
                  return (
                    <li className={`${className}__tags_li`} key={nanoid()}>
                      {tag}
                    </li>
                  );
                })}
            </ul>
          </div>
        </Link>
      </li>
    </div>
  );
};

export const DrinkItem = styled(FCDrinkItem)`
  :not(:nth-of-type(1)) {
    margin-top: 20px;
  }
  &__link {
    text-decoration: none;
    color: #fff;
    display: flex;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
  &__img {
    height: 100px;
    width: 100px;
  }
  &__desc {
    margin-left: 13px;
  }
  &__title {
    font-size: 15px;
  }
  &__rate {
    margin-top: 6px;
    .MuiRating-iconFilled {
      color: #ac966f;
    }
    .MuiRating-iconEmpty {
      color: #414040;
    }
  }
  &__tags {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }
  &__tags_li {
    border: 1px solid #ac966f;
    padding: 3px 17px;
    border-radius: 14px;
    margin-right: 4px;
    white-space: nowrap;
  }
`;
