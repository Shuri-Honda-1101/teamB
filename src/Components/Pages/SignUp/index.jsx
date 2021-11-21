import React, { useState } from "react";
import firebase from "../../libs/firebase";
import styled from "styled-components";

//components
import { Button } from "../../utility/Button/Button";

export const FCSignUp = ({ className, history }) => {
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
    <section className={className}>
      <h1>新規登録</h1>
      <form className={`${className}__form`}>
        <div className={`${className}__input_wrap`}>
          <div className={`${className}__input`}>
            <label htmlFor="email"></label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="メールアドレス"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`${className}__input`}>
            <label htmlFor="password"></label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="パスワード"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={`${className}__input`}>
            <label htmlFor="password"></label>
            <input
              name="confirm"
              type="password"
              id="confirm"
              placeholder="パスワードの確認"
              value={confirm}
              required
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </div>
        <Button long="long" label="新規登録" onClick={handleSubmit} />
      </form>
    </section>
  );
};

export const SignUp = styled(FCSignUp)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 78px;
  height: 274px;
  justify-content: space-between;
  h1 {
    font: normal normal normal 17px/29px Hiragino Sans;
    letter-spacing: 2.38px;
  }

  &__form {
    height: 208px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &__input_wrap {
    height: 133.5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &__input {
    input {
      width: 302px;
      height: 28px;
      padding: 0 0 13.5px 7.5px;
      font: normal normal normal 14px/24px Hiragino Sans;
      letter-spacing: 1.4px;
      ::placeholder {
        color: #5c5a5a;
        font: normal normal normal 14px/24px Hiragino Sans;
        letter-spacing: 1.4px;
      }
    }
  }
`;
