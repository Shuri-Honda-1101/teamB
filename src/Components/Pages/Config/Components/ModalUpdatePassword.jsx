import { useRef, useState, useContext, useEffect } from "react";
import styled from "styled-components";

//components
import { ModalConfirmPassword } from "./ModalConfirmPassword";

//functions
import { AuthContext } from "../../../utility/AuthService";
import { getProvider } from "../../../libs/getProvider";
import { onSubmitPassword } from "../../../libs/onSubmitPassword";
import { getCredential } from "../../../libs/getCredential";
import { updatePassword } from "../../../libs/updatePassword";

export const FCModalUpdatePassword = ({ className, setOpen }) => {
  const modalRef = useRef(null);
  const [newPassword, setNewPassword] = useState("");
  const user = useContext(AuthContext);
  const [provider, setProvider] = useState(null);
  const [openModalConfirmPassword, setOpenModalConfirmPassword] =
    useState(false);
  const [nowPassword, setNowPassword] = useState("");

  //ログインプロバイダを取得する処理
  useEffect(() => {
    getProvider(user, setProvider);
  }, [user]);

  //ModalConfirmPassword(パスワード確認)でOKを押した時の処理
  const onSubmitConfirmPassword = async (e) => {
    e.preventDefault();
    getCredential(user, nowPassword, setNowPassword) &&
      updatePassword(user, newPassword, setOpen, setOpenModalConfirmPassword);
  };

  return (
    <div className={className}>
      {openModalConfirmPassword && (
        <ModalConfirmPassword
          setOpen={setOpenModalConfirmPassword}
          onSubmit={onSubmitConfirmPassword}
          setPassword={setNowPassword}
          password={nowPassword}
        />
      )}
      <SModalWrap
        onClick={(e) => {
          //モーダルウィンドウの外側がクリックされたか判定、外側なら閉じる
          if (modalRef.current.contains(e.target)) return;
          setOpen(false);
        }}
      >
        <SModalInner ref={modalRef}>
          {provider === "google.com" && (
            <div>
              <p>{provider}でログインしているため、変更できません</p>
            </div>
          )}
          {provider === "password" && (
            <div>
              <h1>パスワード変更</h1>
              <form
                onSubmit={(e) => {
                  onSubmitPassword(e, newPassword, setOpenModalConfirmPassword);
                }}
              >
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="現在のパスワード"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
                <button type="submit">OK</button>
              </form>
            </div>
          )}
        </SModalInner>
      </SModalWrap>
    </div>
  );
};

export const ModalUpdatePassword = styled(FCModalUpdatePassword)``;

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
