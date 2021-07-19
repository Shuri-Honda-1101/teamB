import styled from "styled-components";

const ModalDeleteMemo = ({
  setOpenModalDeleteMemo,
  onClickDelete,
  setDeleteMemoId,
}) => {
  return (
    <>
      <SModalWrap>
        <SModalInner>
          <p>メモを削除しますか？</p>
          <button onClick={onClickDelete}>はい</button>
          <button
            onClick={() => {
              setDeleteMemoId(null);
              setOpenModalDeleteMemo(false);
            }}
          >
            いいえ
          </button>
        </SModalInner>
      </SModalWrap>
    </>
  );
};

const SModalWrap = styled.section`
  z-index: 3;
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
  color: black;
  background-color: #fffffe;
  width: calc(1500 / 1920 * 100vw);
  height: calc(1900 / 1920 * 100vw);
  border-radius: calc(65 / 1920 * 100vw);
`;

export default ModalDeleteMemo;
