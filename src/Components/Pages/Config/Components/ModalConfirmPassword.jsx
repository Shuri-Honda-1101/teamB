import { useRef } from "react";
import styled from "styled-components";

export const FCModalConfirmPassword = ({
  setOpen,
  onSubmit,
  setPassword,
  password,
  className,
}) => {
  const modalRef = useRef(null);

  return (
    <div className={className}>
      <SModalWrap
        onClick={(e) => {
          //モーダルウィンドウの外側がクリックされたか判定、外側なら閉じる
          if (modalRef.current.contains(e.target)) return;
          setOpen(false);
        }}
      >
        <SModalInner ref={modalRef}>
          <h1>パスワード確認</h1>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button type="submit">OK</button>
          </form>
        </SModalInner>
      </SModalWrap>
    </div>
  );
};

export const ModalConfirmPassword = styled(FCModalConfirmPassword)``;

const SModalWrap = styled.section`
  z-index: 4;
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
  color: #000;
  background-color: #fffffe;
  width: calc(1500 / 1920 * 100vw);
  height: calc(1500 / 1920 * 100vw);
  border-radius: calc(65 / 1920 * 100vw);
`;
