import { useEffect } from "react";
import { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../utility/AuthService";
import ModalConfirmPassword from "./ModalConfirmPassword";
import firebase from "../../../../config/firebase";

const ModalUpdateEmail = ({ setOpen, setOpenConfirm }) => {
  const user = useContext(AuthContext);
  const modalRef = useRef(null);
  const [email, setEmail] = useState(user.email);
  const [openModalConfirmPassword, setOpenModalConfirmPassword] =
    useState(false);
  const [nowPassword, setNowPassword] = useState("");
  const [provider, setProvider] = useState(null);

  //ログインプロバイダを取得する処理
  useEffect(() => {
    if (user !== null) {
      user.providerData.forEach((profile) => {
        setProvider(profile.providerId);
      });
    }
  }, [user]);

  //OKボタンを押した時の処理
  const onSubmitEmail = (e) => {
    e.preventDefault();
    if (email !== user.email) {
      setOpenModalConfirmPassword(true);
    } else {
      setOpen(false);
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

    //メールアドレスの更新
    const updateResult =
      credentialResult &&
      (await user
        .updateEmail(email)
        .then(() => true)
        .catch((err) => {
          console.log(err);
          alert("メールアドレスの変更に失敗しました");
          return;
        }));

    //確認メールを送信する
    updateResult &&
      user
        .sendEmailVerification()
        .then(() => {
          setOpen(false);
          setOpenModalConfirmPassword(false);
          alert("新しいメールアドレスに確認メール送信しました");
        })
        .catch((err) => {
          console.log(err);
          alert("確認メールを送信できませんでした");
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
              <h1>メールアドレス変更</h1>
              <form onSubmit={onSubmitEmail}>
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

export default ModalUpdateEmail;
