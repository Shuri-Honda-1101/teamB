import firebase from "./firebase";

//タグを消去する関数
export const deleteTag = (userTags, user) => {
  const uidDoc = firebase.firestore().collection("users").doc(user.uid);
  //triggerがtrueのものだけ抽出して配列にする
  const results = userTags.filter((userTag) => userTag.trigger === true);
  const tagNames = results.map((result) => result.tag);
  results.forEach((result) => {
    //順にコレクションから削除
    uidDoc
      .collection("tags")
      .doc(result.id)
      .delete()
      .then(() => console.log("削除"))
      .catch((err) => console.log(err));
    //同様に、drinkドキュメント内で選択したタグをtagsに記録しているもののみ、tagsの配列から削除
    const drinkCollection = uidDoc.collection("drinks");
    drinkCollection
      .where("tags", "array-contains-any", tagNames)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          drinkCollection
            .doc(doc.id)
            .update({
              tags: firebase.firestore.FieldValue.arrayRemove(result.tag),
            })
            .then(() => console.log("成功"))
            .catch((err) => console.log(err));
        })
      );
  });
};
