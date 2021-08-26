import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utility/AuthService";
import firebase from "../../../config/firebase";
import TagList from "../../utility/TagsList";
import MemoListItem from "./Components/MemoListItem";
import Header from "../../utility/Header";
import Footer from "../../utility/Footer";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import ModalItemChoice from "../../utility/ModalItemChoice";
import { FontStyle } from "../../utility/Snippets";
import ModalDelete from "./Components/ModalDelete";

const Item = ({ history }) => {
  const [openModalItemChoice, setOpenModalItemChoice] = useState(false);
  const [drinkData, setDrinkData] = useState(null);
  const [memos, setMemos] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [deleteMemoId, setDeleteMemoId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleteDrinkId, setDeleteDrinkId] = useState(null);
  const [deleteMemoDate, setDeleteMemoDate] = useState(null);

  const drinkId = useParams().did;
  const user = useContext(AuthContext);

  //削除機能
  const onClickDelete = async () => {
    if (user != null) {
      const uidDB = firebase.firestore().collection("users").doc(user.uid);
      const drinkDoc = uidDB.collection("drinks").doc(drinkId);
      //memo削除ボタンを押された時の処理
      if (deleteMemoId) {
        //親ドキュメントの配列から削除する機能
        const deleteMemoDateProcess = await drinkDoc
          .update({
            dates: firebase.firestore.FieldValue.arrayRemove(deleteMemoDate),
          })
          .then(() => true)
          .catch((err) => {
            console.log(err);
            return false;
          });
        //メモドキュメントから削除する機能
        const deleteMemoProcess = await drinkDoc
          .collection("memos")
          .doc(deleteMemoId)
          .delete()
          .then(() => true)
          .catch((err) => {
            console.log(err);
            return false;
          });
        setOpenModalDelete(false);
        setDeleteMemoId(null);
        //どちらも成功したときに成功アラートを出す
        if (deleteMemoDateProcess && deleteMemoProcess) {
          alert("メモを削除しました");
        } else {
          alert("メモの削除に失敗しました");
        }
      } else if (deleteDrinkId) {
        //まとめて削除を押された時の処理
        const deleteDrink = await drinkDoc
          .delete()
          .then(() => {
            history.push(`/user/${user.uid}`);
            return "お酒を削除しました";
          })
          .catch((err) => {
            console.log(err);
            return "お酒を削除できませんでした";
          });
        setOpenModalDelete(false);
        setDeleteDrinkId(null);
        alert(deleteDrink);
      }
    }
  };

  useEffect(() => {
    if (user != null) {
      const uidDB = firebase.firestore().collection("users").doc(user.uid);
      const drinkDoc = uidDB.collection("drinks").doc(drinkId);
      drinkDoc.onSnapshot((doc) => {
        const drinkData = { ...doc.data(), id: doc.id };
        setDrinkData(drinkData);
      });
      drinkDoc
        .collection("memos")
        .orderBy("date")
        .onSnapshot((querySnapshot) => {
          const memos = querySnapshot.docs.map((doc) => {
            const yyyy = doc.data().date.toDate().getFullYear();
            const mm = ("0" + (doc.data().date.toDate().getMonth() + 1)).slice(
              -2
            );
            const dd = ("0" + doc.data().date.toDate().getDate()).slice(-2);
            const YMD = `${yyyy}/${mm}/${dd}`;
            return { ...doc.data(), id: doc.id, YMDDate: YMD };
          });
          setMemos(memos);
        });
    }
  }, [user, drinkId]);

  return (
    <>
      <Header />
      {openModalDelete && (
        <ModalDelete
          setOpenModalDelete={setOpenModalDelete}
          onClickDelete={onClickDelete}
          setDeleteMemoId={setDeleteMemoId}
          deleteMessage={deleteMessage}
          setDeleteMessage={setDeleteMessage}
          setDeleteDrinkId={setDeleteDrinkId}
        />
      )}
      {openModalItemChoice && (
        <ModalItemChoice
          setOpenModalItemChoice={setOpenModalItemChoice}
          history={history}
        />
      )}
      {drinkData && (
        <SItemWrap>
          <img src={drinkData.image} alt={drinkData.drink} />
          <SNameRateWrap>
            <h2>{drinkData.drink}</h2>
            <SRating name="rate" value={drinkData.rate} readOnly />
          </SNameRateWrap>
          <STagListWrap>
            <TagList tags={drinkData.tags} />
          </STagListWrap>
          <SButton
            onClick={() => {
              history.push(`/edit/${drinkData.id}`);
            }}
          >
            記録を残す
          </SButton>
          <div>
            <ul>
              {memos &&
                memos.map((memo) => {
                  return (
                    <MemoListItem
                      setDeleteMemoDate={setDeleteMemoDate}
                      setOpenModalDelete={setOpenModalDelete}
                      setDeleteMemoId={setDeleteMemoId}
                      key={memo.id}
                      drinkId={drinkId}
                      id={memo.id}
                      memo={memo.memo}
                      date={memo.YMDDate}
                      setDeleteMessage={setDeleteMessage}
                      timestamp={memo.date}
                    />
                  );
                })}
            </ul>
          </div>
          <SButton
            onClick={() => {
              setDeleteMessage("お酒");
              setOpenModalDelete(true);
              setDeleteDrinkId(drinkId);
            }}
          >
            まとめて削除
          </SButton>
        </SItemWrap>
      )}
      <Footer
        setOpenModalItemChoice={setOpenModalItemChoice}
        history={history}
      />
    </>
  );
};

const SItemWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: calc(16 / 375 * 100vw) 0;
  img {
    width: calc(302 / 375 * 100vw);
    height: calc(302 / 375 * 100vw);
  }
`;

const SNameRateWrap = styled.div`
  width: calc(302 / 375 * 100vw);
  h2 {
    ${FontStyle}
    margin-top: calc(34 / 375 * 100vw);
    font-size: calc(17 / 375 * 100vw);
    font-weight: 400;
    letter-spacing: calc(4 / 375 * 100vw);
    line-height: calc(24 / 17);
  }
`;

const SRating = styled(Rating)`
  margin-top: calc(6 / 375 * 100vw);
  font-size: calc(24 / 375 * 100vw);
  ${FontStyle}
  .MuiRating-icon {
    margin-right: calc(3 / 375 * 100vw);
  }
  .MuiRating-iconFilled {
    color: #ac966f;
  }
  .MuiRating-iconEmpty {
    color: #414040;
  }
`;

const STagListWrap = styled.div`
  margin-top: calc(13 / 375 * 100vw);
`;

const SButton = styled.button`
  background-color: #212121;
  color: #ffffff;
  border: none;
  border-radius: calc(10 / 375 * 100vw);
  width: calc(302 / 375 * 100vw);
  height: calc(37 / 375 * 100vw);
  margin-top: calc(13 / 375 * 100vw);
  line-height: calc(37 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  letter-spacing: calc(4.2 / 375 * 100vw);
  ${FontStyle}
  font-weight: 100;
  :hover {
    border: 1px solid #fff;
    background-color: #414040;
  }
`;

export default Item;
