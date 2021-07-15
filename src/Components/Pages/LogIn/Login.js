import React, { useState, useContext } from "react";
import firebase from "../../../config/firebase";
import { AuthContext } from "../../utility/AuthService";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ModalForgetPassword from "./Components/ModalForgetPassword";

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
      {openModalForgetPassword && (
        <ModalForgetPassword
          setOpenModalForgetPassword={setOpenModalForgetPassword}
          resetPasswordEmail={resetPasswordEmail}
          setResetPasswordEmail={setResetPasswordEmail}
          onClickResetPasswordSubmit={onClickResetPasswordSubmit}
        />
      )}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => {
          setOpenModalForgetPassword(true);
        }}
      >
        パスワードを忘れましたか？
      </button>
      <button onClick={onClickGoogle}>Googleでログイン</button>
      <Link to="/signup">新規登録</Link>
    </>
  );
};

export default Login;
