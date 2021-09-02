import styled from "styled-components";
import { AuthContext } from "../../../utility/AuthService";
import firebase from "../../../../config/firebase";
import { useEffect, useState, useContext } from "react";
import UserTagListItem from "../../../utility/UserTagListItem";

export const FCTagListEdit = ({ className, setOpen }) => {
  const [userTags, setUserTags] = useState(null);
  const [tagText, setTagText] = useState("");
  const user = useContext(AuthContext);
  const uidDoc = firebase.firestore().collection("users").doc(user.uid);
  const [drinks, setDrinks] = useState(null);

  useEffect(() => {
    const uidDB = firebase.firestore().collection("users").doc(user.uid);
    uidDB.collection("tags").onSnapshot((querySnapshot) => {
      let tags = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id, trigger: false };
      });
      setUserTags(tags);
    });

    uidDB.collection("drinks").onSnapshot((querySnapshot) => {
      let drinks = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setDrinks(drinks);
    });
  }, [user]);

  const addTag = (e) => {
    e.preventDefault();
    if (tagText === "") return;
    uidDoc.collection("tags").doc().set({ tag: tagText });
  };

  const deleteTag = () => {
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

  return (
    <div className={className}>
      <button onClick={() => setOpen(false)} className={`${className}__back`}>
        戻る
      </button>
      <h2 className={`${className}__title`}>タグ編集</h2>
      <div className={`${className}__tagList`}>
        <ul>
          {userTags &&
            userTags.map((tag) => {
              return <UserTagListItem tag={tag} key={tag.id} />;
            })}
        </ul>
      </div>
      <button onClick={deleteTag} className={`${className}__btn`}>
        選択したタグを削除
      </button>
      <div className={`${className}__add`}>
        <input
          name="tag"
          placeholder="新規タグ追加"
          value={tagText}
          onChange={(e) => {
            setTagText(e.target.value);
          }}
        />
        <button onClick={addTag}>追加</button>
      </div>
    </div>
  );
};

export const TagListEdit = styled(FCTagListEdit)``;
