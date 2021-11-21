import styled from "styled-components";

export const FCTagsListItem = ({ content, className }) => {
  return (
    <li className={className}>
      <span>{content}</span>
    </li>
  );
};

export const TagsListItem = styled(FCTagsListItem)`
  font: normal normal normal 13px/23px Hiragino Sans;
  border: 1px solid #ac966f;
  padding: 4.3px 22.7px;
  border-radius: 14px;
  margin-right: 5.1px;
  margin-bottom: 6.37px;
  white-space: nowrap;
`;
