import TagsListItem from "./TagsListItem";
import shortid from "shortid";

const TagsList = ({ tags }) => {
  return (
    <ul>
      {tags &&
        tags.map((tag, index) => {
          return <TagsListItem content={tag} key={shortid.generate()} />;
        })}
    </ul>
  );
};

export default TagsList;
