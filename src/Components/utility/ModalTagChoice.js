import styled from "styled-components";
import UserTagListItem from "./UserTagListItem";

const ModalTagChoice = ({
  userTags,
  setOpenModalTagChoice,
  addFilterTagArray,
}) => {
  const onClickOK = () => {
    setOpenModalTagChoice(false);
    addFilterTagArray();
  };
  return (
    <>
      <SModalWrap>
        <SModalInner>
          <ul>
            {userTags.map((tag) => {
              return <UserTagListItem tag={tag} key={tag.id} />;
            })}
          </ul>
          <button onClick={onClickOK}>OK</button>
        </SModalInner>
      </SModalWrap>
    </>
  );
};

const SModalWrap = styled.section`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SModalInner = styled.div`
  background-color: #fffffe;
  width: calc(1500 / 1920 * 100vw);
  height: calc(1900 / 1920 * 100vw);
  border-radius: calc(65 / 1920 * 100vw);
`;

export default ModalTagChoice;
