import firebase from "./firebase";

export const getCredential = async (user, nowPassword, setNowPassword) => {
  //ユーザーの再認証
  const credential = await firebase.auth.EmailAuthProvider.credential(
    user.email,
    nowPassword
  );
  await user
    .reauthenticateWithCredential(credential)
    .then(() => true)
    .catch((err) => {
      console.log(err);
      alert("パスワードが間違っています");
      setNowPassword("");
      return;
    });
};
