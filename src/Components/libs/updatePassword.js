//パスワードの更新
export const updatePassword = (
  user,
  newPassword,
  setOpen,
  setOpenModalConfirmPassword
) => {
  user
    .updatePassword(newPassword)
    .then(() => {
      setOpen(false);
      setOpenModalConfirmPassword(false);
      alert("パスワードを変更しました");
    })
    .catch((err) => {
      console.log(err);
      alert("パスワードの変更に失敗しました");
      return;
    });
};
