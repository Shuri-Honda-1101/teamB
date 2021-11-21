import styled from "styled-components";

export const FCModalDelete = ({
  setOpenModalDelete,
  onClickDelete,
  setDeleteMemoId,
  deleteMessage,
  setDeleteMessage,
  setDeleteDrinkId,
  className,
}) => {
  return (
    <section className={className}>
      <div className={`${className}__inner`}>
        <p>この{deleteMessage}を削除しますか？</p>
        <button onClick={onClickDelete}>はい</button>
        <button
          onClick={() => {
            setDeleteMemoId(null);
            setOpenModalDelete(false);
            setDeleteMessage(null);
            setDeleteDrinkId(null);
          }}
        >
          いいえ
        </button>
      </div>
    </section>
  );
};

export const ModalDelete = styled(FCModalDelete)`
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

  &__inner {
    color: black;
    background-color: #fffffe;
    width: 315px;
    height: 234px;
    border-radius: 31px;
  }
`;
