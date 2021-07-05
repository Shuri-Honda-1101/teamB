import { useState } from "react";
import styled from "styled-components";
import UserTagListItem from "./UserTagListItem";
import firebase from "../../config/firebase";
import { useEffect } from "react";
import shortid from "shortid";

const ModalTagChoice = ({
  user,
  setOpenModalTagChoice,
  setChoiceTagArray,
  newTagInput,
}) => {
  const [userTags, setUserTags] = useState(null);
  const [tagText, setTagText] = useState("");

  useEffect(() => {
    const uidDB = firebase.firestore().collection("users").doc(user.uid);
    uidDB.collection("tags").onSnapshot((querySnapshot) => {
      let tags = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id, trigger: false };
      });
      setUserTags(tags);
    });
  }, [user]);

  //新規タグ追加ボタンを押した時の処理
  // タグを送信して配列に追加する
  const addTags = (e) => {
    e.preventDefault();
    if (tagText === "") return;
    setUserTags([
      ...userTags,
      { tag: tagText, id: shortid.generate(), trigger: false },
    ]);
    setTagText("");
  };

  //OKを押した時の処理
  const onClickOK = () => {
    setOpenModalTagChoice(false);
    //triggerがtrueのものだけ抽出して配列にする
    const results = userTags.filter((userTag) => userTag.trigger === true);
    const newResults = results.map((result) => result.tag);
    setChoiceTagArray(newResults);
  };

  return (
    <>
      <SModalWrap>
        <SModalInner>
          <ul>
            {userTags &&
              userTags.map((tag) => {
                return <UserTagListItem tag={tag} key={tag.id} />;
              })}
          </ul>
          {newTagInput && (
            <div>
              <input
                name="tag"
                placeholder="新規タグ追加"
                value={tagText}
                onChange={(e) => {
                  setTagText(e.target.value);
                }}
              />
              <button onClick={addTags}>新規タグ追加</button>
            </div>
          )}
          <button onClick={onClickOK}>OK</button>
        </SModalInner>
      </SModalWrap>
    </>
  );
};

const SModalWrap = styled.section`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SModalInner = styled.div`
  background-color: #fffffe;
  width: calc(1500 / 1920 * 100vw);
  height: calc(1900 / 1920 * 100vw);
  border-radius: calc(65 / 1920 * 100vw);
`;

export default ModalTagChoice;
