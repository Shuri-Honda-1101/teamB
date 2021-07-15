import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AllDrinkListItem from "./AllDrinkListItem";
import { AuthContext } from "./AuthService";
import firebase from "../../config/firebase";

const ModalItemChoice = ({ setOpenModalItemChoice, history }) => {
  const [path, setPath] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user != null) {
      const uidDB = firebase.firestore().collection("users").doc(user.uid);
      //お酒一覧取得
      uidDB.collection("drinks").onSnapshot((querySnapshot) => {
        let drinks = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setDrinks(drinks);
      });
    }
  });

  //OKクリック時の処理
  const onClickPath = () => {
    if (path !== null) {
      setOpenModalItemChoice(false);
      history.push(`/edit/${path}`);
    } else {
      alert("お酒が選択されていません");
    }
  };

  return (
    <>
      <SModalWrap>
        <SModalInner>
          <button
            onClick={() => {
              setOpenModalItemChoice(false);
            }}
          >
            戻る
          </button>
          <p>どのお酒にメモを残しますか？</p>
          <ul>
            {drinks &&
              drinks.map((drink) => {
                return (
                  <AllDrinkListItem
                    key={drink.id}
                    id={drink.id}
                    drink={drink.drink}
                    setPath={setPath}
                  />
                );
              })}
          </ul>
          <button onClick={onClickPath}>OK</button>
          <p>もしくは</p>
          <Link to="/new">
            <button
              onClick={() => {
                setOpenModalItemChoice(false);
              }}
            >
              新しく追加する
            </button>
          </Link>
        </SModalInner>
      </SModalWrap>
    </>
  );
};

const SModalWrap = styled.section`
  z-index: 3;
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

export default ModalItemChoice;
