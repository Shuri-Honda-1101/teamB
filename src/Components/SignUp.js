import React from "react";
import firebase from "../config/firebase";

export const SignUp = () => {
  return (
    <div>
      <h1>新規ユーザー登録</h1>
      <form>
        <div>
          <label htmlFor="name">ユーザー名: </label>
          <input name="name" type="name" id="name" placeholder="ユーザー名" />
        </div>
        <div>
          <label htmlFor="email">メールアドレス: </label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="メールアドレス"
          />
        </div>
        <div>
          <label htmlFor="password">パスワード: </label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="パスワード"
          />
        </div>
        <button type="submit">新規登録</button>
      </form>
    </div>
  );
};
