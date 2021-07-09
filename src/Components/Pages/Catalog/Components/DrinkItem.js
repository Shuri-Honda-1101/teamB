import shortid from "shortid";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";

const DrinkItem = ({ id, drink, rate, tags, image }) => {
  const match = useRouteMatch();
  return (
    <SList>
      <SLink to={`${match.url}/items/${id}`}>
        <img src={image} alt={drink} />
        <SDrinkItemListWrap>
          <h2>{drink}</h2>
          <SRating name="rate" value={rate} readOnly />
          <STags>
            {tags &&
              tags.map((tag) => {
                return <li key={shortid.generate()}>{tag}</li>;
              })}
          </STags>
        </SDrinkItemListWrap>
      </SLink>
    </SList>
  );
};

const SList = styled.li`
  :not(:nth-of-type(1)) {
    margin-top: calc(20 / 375 * 100vw);
  }
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  display: flex;
  img {
    height: calc(100 / 375 * 100vw);
    width: calc(100 / 375 * 100vw);
  }
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const SDrinkItemListWrap = styled.div`
  margin-left: calc(13 / 375 * 100vw);

  h2 {
    font-size: calc(15 / 375 * 100vw);
  }
`;

const SRating = styled(Rating)`
  margin-top: calc(6 / 375 * 100vw);
  .MuiRating-iconFilled {
    color: #ac966f;
  }
  .MuiRating-iconEmpty {
    color: #414040;
  }
`;

const STags = styled.ul`
  margin-top: calc(6 / 375 * 100vw);
  display: flex;
  align-content: space-between;
  li {
    border: 1px solid #ac966f;
    padding: calc(3 / 375 * 100vw) calc(17 / 375 * 100vw);
    border-radius: calc(14 / 375 * 100vw);
    margin-right: calc(4 / 375 * 100vw);
  }
`;

export default DrinkItem;
