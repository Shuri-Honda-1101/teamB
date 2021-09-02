import { useRef, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../utility/AuthService";
import ModalConfirmPassword from "./ModalConfirmPassword";
import firebase from "../../../../config/firebase";

const ModalUpdatePassword = ({ setOpen }) => {
  const modalRef = useRef(null);
  const [newPassword, setNewPassword] = useState("");
  const user = useContext(AuthContext);
  const [provider, setProvider] = useState(null);
  const [openModalConfirmPassword, setOpenModalConfirmPassword] =
    useState(false);
  const [nowPassword, setNowPassword] = useState("");

  //ログインプロバイダを取得する処理
  useEffect(() => {
    if (user !== null) {
      user.providerData.forEach((profile) => {
        setProvider(profile.providerId);
      });
    }
  }, [user]);

  //新しいパスワード入力→OKの処理
  const onSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 5) {
      alert("パスワードは6文字以上で設定してください");
    } else {
      setOpenModalConfirmPassword(true);
    }
  };

  //ModalConfirmPassword(パスワード確認)でOKを押した時の処理
  const onSubmitConfirmPassword = async (e) => {
    e.preventDefault();
    //ユーザーの再認証
    const credential = await firebase.auth.EmailAuthProvider.credential(
      user.email,
      nowPassword
    );
    const credentialResult = await user
      .reauthenticateWithCredential(credential)
      .then(() => true)
      .catch((err) => {
        console.log(err);
        alert("パスワードが間違っています");
        setNowPassword("");
        return;
      });
    //パスワードの更新
    credentialResult &&
      user
        .updatePassword(newPassword)
        .then(() => {
          setOpen(false);
          setOpenModalConfirmPassword(false);
          alert("パスワードを変更しました");
        })
        .catch((err) => {
          console.log(err);
          alert("パスワードの変更に失敗しました");
          return;
        });
  };

  return (
    <>
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
              <form onSubmit={onSubmitPassword}>
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
