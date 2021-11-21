import React, { useState, useContext } from "react";
import firebase from "../../libs/firebase";
import { AuthContext } from "../../utility/AuthService";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { ModalForgetPassword } from "./Components/ModalForgetPassword";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "../../utility/Button/Button";

export const FCLogin = ({ className, history }) => {
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
    <section className={className}>
      {openModalForgetPassword && (
        <ModalForgetPassword
          setOpenModalForgetPassword={setOpenModalForgetPassword}
          resetPasswordEmail={resetPasswordEmail}
          setResetPasswordEmail={setResetPasswordEmail}
          onClickResetPasswordSubmit={onClickResetPasswordSubmit}
        />
      )}
      <div className={`${className}__inner`}>
        <form>
          <h1>ログイン</h1>
          <div>
            <label htmlFor="email"></label>
            <input
              className={`${className}__input`}
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
            <input
              className={`${className}__input`}
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
          <Button
            className={`${className}__button_login`}
            long="long"
            label="ログイン"
            onClick={handleSubmit}
          />
        </form>
        <button
          className={`${className}__button_forget`}
          onClick={() => {
            setOpenModalForgetPassword(true);
          }}
        >
          パスワードを忘れましたか？
        </button>
        <p className={`${className}__text`}>OR</p>
        <button
          className={`${className}__button_google`}
          onClick={onClickGoogle}
        >
          <FontAwesomeIcon
            className={`${className}__icon`}
            icon={faGoogle}
            size="lg"
            transform="left-40"
          />
          Googleでログイン
        </button>

        <Link to="/signup">
          <Button
            className={`${className}__button_signUp`}
            long="long"
            label="新規登録"
          />
        </Link>
      </div>
    </section>
  );
};

export const Login = styled(FCLogin)`
  &__inner {
    margin: 84.5px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      font: normal normal normal 17px/29px Hiragino Sans;
      letter-spacing: 2.38px;
      margin-bottom: 35.5px;
    }
  }

  &__input {
    width: 302px;
    margin-bottom: 11.5px;
    padding: 10.5px 0 10.5px 7.5px;
    ::placeholder {
      color: #5c5a5a;
      font: normal normal normal 14px/24px Hiragino Sans;
      letter-spacing: 1.4px;
    }
  }

  &__button_login {
    margin-top: 26px;
  }

  &__button_forget {
    color: #707070;
    border: none;
    background-color: transparent;
    margin-top: 22px;
    font: normal normal normal 14px/24px Hiragino Sans;
    letter-spacing: 1.4px;
  }

  &__text {
    font: normal normal normal 14px/24px Hiragino Kaku Gothic ProN;
    letter-spacing: 4.2px;
    color: #ac966f;
    text-align: center;
    margin-top: 38px;
  }

  &__button_signUp {
    display: block;
    margin: 0 auto;
    margin-top: 16px;
  }

  &__button_google {
    display: block;
    margin: 0 auto;
    background-color: #212121;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    width: 302px;
    height: 37px;
    margin-top: 38px;
    font: normal normal normal 14px/37px Hiragino Sans;
    letter-spacing: 4.2px;
    position: relative;
    :before {
      content: "";
      background-color: #5c5a5a;
      height: 34px;
      width: 36px;
      position: absolute;
      left: 0;
      border-radius: 10px 0 0 10px;
    }
    :hover {
      border: 1px solid #fff;
      background-color: #414040;
    }
  }

  &__icon {
    position: absolute;
    top: 9px;
    left: 57px;
    color: #000;
    z-index: 1;
  }
`;
