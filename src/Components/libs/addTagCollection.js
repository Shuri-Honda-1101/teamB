import firebase from "./firebase";

//タグの追加処理
export const addTagCollection = (e, tagText, setTagText, user) => {
  e.preventDefault();
  const uidDoc = firebase.firestore().collection("users").doc(user.uid);
  if (tagText === "") return;
  uidDoc
    .collection("tags")
    .doc()
    .set({ tag: tagText })
    .then(() => {
      setTagText("");
    })
    .catch((err) => console.log(err));
};
