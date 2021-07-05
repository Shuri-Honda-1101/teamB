import { useState } from "react";

const UserTagListItem = ({ tag }) => {
  const [tagTrigger, setTagTrigger] = useState(tag.trigger);
  const setTrigger = () => {
    tag.trigger = !tag.trigger;
    setTagTrigger(tag.trigger);
    console.log(tag.trigger);
  };
  return (
    <li>
      <button
        onClick={setTrigger}
        style={
          tagTrigger
            ? { backgroundColor: "pink" }
            : { backgroundColor: "white" }
        }
      >
        {tag.tag}
      </button>
    </li>
  );
};

export default UserTagListItem;
