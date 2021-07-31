import styled from "styled-components";

const AllDinkListItem = ({ drink, id, setPath }) => {
  return (
    <li>
      <SItemButton
        onClick={() => {
          setPath(id);
        }}
      >
        {drink}
      </SItemButton>
    </li>
  );
};

// const SDrinkListItem = styled.li`

// `
const SItemButton = styled.button`
  background-color: #212121;
  margin: 10px 20px;
  width: calc(198 / 375 * 100vw);
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  border-bottom: 1px solid #414040;
  :hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export default AllDinkListItem;
