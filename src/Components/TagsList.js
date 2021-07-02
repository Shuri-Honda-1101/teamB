import TagsListItem from "./TagsListItem";

const TagsList = ({ tags }) => {
  return (
    <ul>
      {tags.map((tag, index) => {
        return <TagsListItem content={tag} key={index} />;
      })}
    </ul>
  );
};

export default TagsList;
