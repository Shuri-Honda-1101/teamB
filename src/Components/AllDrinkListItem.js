const AllDinkListItem = ({ drink, id, setPath }) => {
  return (
    <li>
      <button
        onClick={() => {
          setPath(id);
        }}
      >
        {drink}
      </button>
    </li>
  );
};

export default AllDinkListItem;
