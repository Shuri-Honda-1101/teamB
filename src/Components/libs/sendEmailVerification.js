//確認メールを送信する
export const sendEmailVerification = (
  user,
  setOpen,
  setOpenModalConfirmPassword
) => {
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
