import { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";

import { AuthContext } from "../../../utility/AuthService";

//components
import { ModalConfirmPassword } from "./ModalConfirmPassword";

//functions
import { getProvider } from "../../../libs/getProvider";
import { onSubmitEmail } from "../../../libs/onSubmitEmail";
import { getCredential } from "../../../libs/getCredential";
import { updateEmail } from "../../../libs/updateEmail";
import { sendEmailVerification } from "../../../libs/sendEmailVerification";

export const FCModalUpdateEmail = ({ className, setOpen }) => {
  const user = useContext(AuthContext);
  const modalRef = useRef(null);
  const [email, setEmail] = useState(user.email);
  const [openModalConfirmPassword, setOpenModalConfirmPassword] =
    useState(false);
  const [nowPassword, setNowPassword] = useState("");
  const [provider, setProvider] = useState(null);

  //ログインプロバイダを取得する処理
  useEffect(() => {
    getProvider(user, setProvider);
  }, [user]);

  //ModalConfirmPassword(パスワード確認)でOKを押した時の処理
  const onSubmitConfirmPassword = async (e) => {
    e.preventDefault();
    getCredential(user, nowPassword, setNowPassword) &&
      updateEmail(user, email) &&
      sendEmailVerification(user, setOpen, setOpenModalConfirmPassword);
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
              <h1>メールアドレス変更</h1>
              <form
                onSubmit={(e) => {
                  onSubmitEmail(
                    e,
                    email,
                    user,
                    setOpen,
                    setOpenModalConfirmPassword
                  );
                }}
              >
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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

export const ModalUpdateEmail = styled(FCModalUpdateEmail)``;

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
