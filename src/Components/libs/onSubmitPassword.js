//新しいパスワード入力→OKの処理
export const onSubmitPassword = (
  e,
  newPassword,
  setOpenModalConfirmPassword
) => {
  e.preventDefault();
  if (newPassword.length < 5) {
    alert("パスワードは6文字以上で設定してください");
  } else {
    setOpenModalConfirmPassword(true);
  }
};
