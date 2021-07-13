import styled from "styled-components";

const TagsListItem = ({ content }) => {
  return (
    <STagItem>
      <span>{content}</span>
    </STagItem>
  );
};

const STagItem = styled.li`
  font-size: calc(13 / 375 * 100vw);
  border: 1px solid #ac966f;
  padding: calc(4.3 / 375 * 100vw) calc(22.7 / 375 * 100vw);
  border-radius: calc(14 / 375 * 100vw);
  margin-right: calc(5.1 / 375 * 100vw);
  margin-bottom: calc(6.37 / 375 * 100vw);
  white-space: nowrap;
`;

export default TagsListItem;
