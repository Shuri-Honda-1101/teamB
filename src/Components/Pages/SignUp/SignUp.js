import React, { useState } from "react";
import firebase from "../../../config/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return "成功";
      })
      .catch((err) => {
        console.log(err);
        return "失敗";
      });
    alert(`アカウントの作成に${result}しました`);
  };

  return (
    <div>
      <h1>新規ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス: </label>
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
        <div>
          <label htmlFor="password">パスワード: </label>
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
        <button type="submit">新規登録</button>
      </form>
    </div>
  );
};

export default SignUp;
