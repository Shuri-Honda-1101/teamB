import { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../utility/AuthService";

const ModalUpdatePassword = ({ setOpen }) => {
  const modalRef = useRef(null);
  const [password, setPassword] = useState("");
  const user = useContext(AuthContext);

  return (
    <>
      <SModalWrap
        onClick={(e) => {
          //モーダルウィンドウの外側がクリックされたか判定、外側なら閉じる
          if (modalRef.current.contains(e.target)) return;
          setOpen(false);
        }}
      >
        <SModalInner ref={modalRef}>
          <h1>パスワードの確認が必要です</h1>
          <form>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="現在のパスワード"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </form>
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
  color: #000;
  background-color: #fffffe;
  width: calc(1500 / 1920 * 100vw);
  height: calc(1900 / 1920 * 100vw);
  border-radius: calc(65 / 1920 * 100vw);
`;

export default ModalUpdatePassword;
