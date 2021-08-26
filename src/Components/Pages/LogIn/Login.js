import React, { useState, useContext } from "react";
import firebase from "../../../config/firebase";
import { AuthContext } from "../../utility/AuthService";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ModalForgetPassword from "./Components/ModalForgetPassword";
import Header from "../../utility/Header";
import styled from "styled-components";
import { FontStyle } from "../../utility/Snippets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = ({ history }) => {
  const user = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModalForgetPassword, setOpenModalForgetPassword] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  if (user) {
    return <Redirect to={`/user/${user.uid}`} />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(`/user/${user.uid}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Googleログイン
  const onClickGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        return "成功";
      })
      .catch((err) => {
        console.log(err);
        return "失敗";
      });
    alert(`googleログインが${result}しました`);
  };

  //パスワード再設定
  const onClickResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const result = await firebase
      .auth()
      .sendPasswordResetEmail(resetPasswordEmail)
      .then(() => {
        setResetPasswordEmail("");
        setOpenModalForgetPassword(false);
        return "入力されたメールアドレスにパスワード再設定のご案内をお送りしました";
      })
      .catch(() => {
        setResetPasswordEmail("");
        return "存在しないメールアドレスです";
      });
    alert(result);
  };

  return (
    <>
      <Header />
      {openModalForgetPassword && (
        <ModalForgetPassword
          setOpenModalForgetPassword={setOpenModalForgetPassword}
          resetPasswordEmail={resetPasswordEmail}
          setResetPasswordEmail={setResetPasswordEmail}
          onClickResetPasswordSubmit={onClickResetPasswordSubmit}
        />
      )}
      <STitle>ログイン</STitle>
      <SLoginWrap onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"></label>
          <SInput
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
        <div>
          <label htmlFor="password"></label>
          <SInput
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
        <SLoginButton type="submit">ログイン</SLoginButton>
      </SLoginWrap>
      <SForgetButton
        onClick={() => {
          setOpenModalForgetPassword(true);
        }}
      >
        パスワードを忘れましたか？
      </SForgetButton>
      <SText>OR</SText>
      <SButton onClick={onClickGoogle}>
        <StyledIcon icon={faGoogle} size="lg" transform="left-40" />
        Googleでログイン
      </SButton>

      <Link to="/signup">
        <SButton>新規登録</SButton>
      </Link>
    </>
  );
};

const STitle = styled.h1`
  font-size: 17px;
  text-align: center;
  margin: 90px 0 50px 0;
`;
const SLoginWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SInput = styled.input`
  width: calc(302 / 375 * 100vw);
  margin-bottom: calc(25 / 375 * 100vw);
`;
const SText = styled.p`
  font-size: calc(15 / 375 * 100vw);
  color: #ac966f;
  text-align: center;
  margin-top: calc(38 / 375 * 100vw);
`;
const SLoginButton = styled.button`
  display: block;
  margin: 0 auto;
  background-color: #212121;
  color: #ffffff;
  border: none;
  border-radius: calc(10 / 375 * 100vw);
  width: calc(302 / 375 * 100vw);
  height: calc(37 / 375 * 100vw);
  margin-top: calc(43 / 375 * 100vw);
  line-height: calc(37 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  letter-spacing: calc(4.2 / 375 * 100vw);
  margin-top: calc(16 / 375 * 100vw);
`;

const SButton = styled.button`
  display: block;
  margin: 0 auto;
  background-color: #212121;
  color: #ffffff;
  border: none;
  border-radius: calc(10 / 375 * 100vw);
  width: calc(302 / 375 * 100vw);
  height: calc(37 / 375 * 100vw);
  margin-top: calc(43 / 375 * 100vw);
  line-height: calc(37 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  letter-spacing: calc(4.2 / 375 * 100vw);
  position: relative;
      :before {
      content: "";
      background-color: #5C5A5A;
      height: calc(37 / 375 * 100vw);
      width: calc(37 / 375 * 100vw);
      position: absolute;
      left: calc(0 / 375 * 100vw);
      border-radius: 10px 0 0 10px;
    }
  
  :last-child {
    margin-top: calc(16 / 375 * 100vw);
    :before {
      content: "";
      background-color: #212121;
      height: calc(37 / 375 * 100vw);
      width: calc(37 / 375 * 100vw);
      position: absolute;
      left: calc(0 / 375 * 100vw);
      border-radius: 10px 0 0 10px;
  }
  ${FontStyle}
  font-weight: 100;
  :hover {
    border: 1px solid #fff;
    background-color: #414040;
  }
`;

const SForgetButton = styled.button`
  display: block;
  margin: 0 auto;
  color: #707070;
  border: none;
  background-color: transparent;
  margin-top: calc(22 / 375 * 100vw);
`;
const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: calc(9 / 375 * 100vw);
  left: calc(55 / 375 * 100vw);
  color: #000;
  z-index: 1;
`;

export default Login;
