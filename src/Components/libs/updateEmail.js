//メールアドレスの更新
export const updateEmail = async (user, email) => {
  await user
    .updateEmail(email)
    .then(() => true)
    .catch((err) => {
      console.log(err);
      alert("メールアドレスの変更に失敗しました");
      return;
    });
};
