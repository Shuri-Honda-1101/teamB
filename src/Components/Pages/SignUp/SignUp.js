import React, { useState } from "react";
import firebase from "../../../config/firebase";
import Header from "../../utility/Header";
import styled from "styled-components";
import { FontStyle } from "../../utility/Snippets";

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("パスワードが一致しません");
      return;
    }
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        history.push(`/user/${user.uid}`);
        return "成功";
      })
      .catch((err) => {
        console.log(err);
        return "失敗";
      });
    alert(`アカウントの作成に${result}しました`);
  };

  return (
    <>
      <Header />
      <div>
        <STitle>新規登録</STitle>
        <SSignUpWrap onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"></label>
            <SInput
              name="email"
              type="email"
              id="email"
              placeholder="メールアドレス"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <SInput
              name="password"
              type="password"
              id="password"
              placeholder="パスワード"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <SInput
              name="confirm"
              type="password"
              id="confirm"
              placeholder="パスワードの確認"
              value={confirm}
              required
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <SButton type="submit">新規登録</SButton>
        </SSignUpWrap>
      </div>
    </>
  );
};

const STitle = styled.h1`
  font-size: 17px;
  text-align: center;
  margin: 90px 0 50px 0;
`;
const SSignUpWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SInput = styled.input`
  width: calc(302 / 375 * 100vw);
  margin-bottom: calc(25 / 375 * 100vw);
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
  margin-top: calc(20 / 375 * 100vw);
  line-height: calc(37 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  letter-spacing: calc(4.2 / 375 * 100vw);
  ${FontStyle}
  font-weight: 100;
  :hover {
    border: 1px solid #fff;
    background-color: #414040;
  }
`;

export default SignUp;
