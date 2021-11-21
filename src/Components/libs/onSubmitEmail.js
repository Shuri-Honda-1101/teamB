//メールアドレスを確認し、パスワードの確認へ進む処理
export const onSubmitEmail = (
  e,
  email,
  user,
  setOpen,
  setOpenModalConfirmPassword
) => {
  e.preventDefault();
  if (email !== user.email) {
    setOpenModalConfirmPassword(true);
  } else {
    setOpen(false);
  }
};
