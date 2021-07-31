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
          <SBranchButton
            onClick={() => {
              setOpenModalItemChoice(false);
            }}
          >
            戻る
          </SBranchButton>
          <p>どのお酒にメモを残しますか？</p>

          <SModalInnerItem>
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
          </SModalInnerItem>

          <SBranchButton onClick={onClickPath}>OK</SBranchButton>
          <SFont>or</SFont>
          <Link to="/new">
            <SBranchButton
              onClick={() => {
                setOpenModalItemChoice(false);
              }}
            >
              新しく追加する
            </SBranchButton>
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
  background-color: #000;
  width: calc(315 / 375 * 100vw);
  height: calc(557 / 375 * 100vw);
  border: 1px solid #ac966f;
  border-radius: calc(65 / 1920 * 100vw);
  text-align: center;
`;

const SModalInnerItem = styled.ul`
  background-color: #212121;
  border-radius: calc(65 / 1920 * 100vw);
  width: calc(235 / 375 * 100vw);
  height: calc(315 / 375 * 100vw);
  border: 1px solid #ffffff;
  overflow: scroll;
  margin: 0 auto;
`;

const SBranchButton = styled.button`
  color: #fff;
  background-color: #212121;
  border-radius: calc(65 / 1920 * 100vw);
  width: calc(235 / 375 * 100vw);
  height: calc(37 / 375 * 100vw);
  margin-top: calc(20 / 375 * 100vw);
  border: none;
`;
const SFont = styled.p`
  font-size: calc(15 / 375 * 100vw);
  color: #ac966f;
  margin-top: calc(10 / 375 * 100vw);
`;

export default ModalItemChoice;
