import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AllDrinkListItem from "./AllDrinkListItem";
import { AuthContext } from "./AuthService";
import firebase from "../libs/firebase";

const ModalItemChoice = ({ setOpenModalItemChoice, history }) => {
  const [path, setPath] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const user = useContext(AuthContext);
  const modalRef = useRef(null);

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
      <SModalWrap
        onClick={(e) => {
          if (modalRef.current.contains(e.target)) return;
          setOpenModalItemChoice(false);
        }}
      >
        <SModalInner ref={modalRef}>
          <SModalInnerText>どのお酒にメモを残しますか？</SModalInnerText>

          <SModalInnerItem>
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
          </SModalInnerItem>

          <SBranchButton onClick={onClickPath}>OK</SBranchButton>
          <SFont>OR</SFont>
          <Link to="/new">
            <SBranchButton
              onClick={() => {
                setOpenModalItemChoice(false);
              }}
            >
              新規作成
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

const SModalInnerText = styled.p`
  font-size: 15px;
  letter-spacing: 1.5px;
  margin: calc(32 / 375 * 100vw);
`;

const SModalInnerItem = styled.div`
  width: calc(235 / 375 * 100vw);
  height: calc(313 / 375 * 100vw);
  border-radius: calc(65 / 1920 * 100vw);
  border: 1px solid #ffffff;
  margin: 0 auto;
  background-color: #212121;
  padding: 15px 0;
  margin-bottom: calc(30 / 375 * 100vw);
  ul {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    height: calc(283 / 375 * 100vw);
  }
`;

const SBranchButton = styled.button`
  color: #fff;
  background-color: #212121;
  border-radius: calc(65 / 1920 * 100vw);
  width: calc(235 / 375 * 100vw);
  height: calc(37 / 375 * 100vw);
  border: none;
  letter-spacing: 4.2px;
  font-size: 14px;
`;
const SFont = styled.p`
  font-size: 12px;
  letter-spacing: 1.2px;
  color: #ac966f;
  margin: calc(10 / 375 * 100vw);
`;

export default ModalItemChoice;
