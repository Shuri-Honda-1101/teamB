import { TagsListItem } from "./TagsListItem";
import { nanoid } from "nanoid";
import styled from "styled-components";

export const FCTagsList = ({ tags, className }) => {
  return (
    <ul className={className}>
      {tags &&
        tags.map((tag) => {
          return <TagsListItem content={tag} key={nanoid()} />;
        })}
    </ul>
  );
};

export const TagsList = styled(FCTagsList)`
  margin-top: 6px;
  width: 302px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;
