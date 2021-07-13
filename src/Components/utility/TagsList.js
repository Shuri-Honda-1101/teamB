import TagsListItem from "./TagsListItem";
import { nanoid } from "nanoid";
import styled from "styled-components";

const TagsList = ({ tags }) => {
  return (
    <STags>
      {tags &&
        tags.map((tag, index) => {
          return <TagsListItem content={tag} key={nanoid()} />;
        })}
    </STags>
  );
};

const STags = styled.ul`
  margin-top: calc(6 / 375 * 100vw);
  width: calc(302 / 375 * 100vw);
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;

export default TagsList;
