import firebase from "./firebase";

//tagsコレクションからデータを取得する関数

export const onSnapShotCollectionTags = (setTags, user) => {
  const uidDB = firebase.firestore().collection("users").doc(user.uid);
  uidDB.collection("tags").onSnapshot((querySnapshot) => {
    let tags = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id, trigger: false };
    });
    setTags(tags);
  });
};
