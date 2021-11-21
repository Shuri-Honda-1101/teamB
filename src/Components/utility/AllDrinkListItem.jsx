import styled from "styled-components";

const AllDinkListItem = ({ drink, id, setPath }) => {
  return (
    <SItemList>
      <button
        onClick={() => {
          setPath(id);
        }}
      >
        <p>{drink}</p>
      </button>
    </SItemList>
  );
};

const SItemList = styled.li`
  height: 35px;
  button {
    background-color: #212121;
    color: #fff;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
    font-size: 11px;
    position: relative;
    :before {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      display: inline-block;
      width: 155px;
      height: 1px;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      background-color: #414040;
    }
  }
  p {
    white-space: nowrap;
    margin: 7px 0;
    padding: 0 min(10px, 103px);
    :hover {
      background-color: rgba(255, 255, 255, 0.25);
    }
  }
`;

export default AllDinkListItem;
