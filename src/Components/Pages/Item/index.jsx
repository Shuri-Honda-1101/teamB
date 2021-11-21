import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utility/AuthService";
import firebase from "../../libs/firebase";

//components
import { TagsList } from "../../utility/TagsList";
import { MemoListItem } from "./Components/MemoListItem";
import { ModalDelete } from "./Components/ModalDelete";

//style
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import { Button } from "../../utility/Button/Button";

export const FCItem = ({ history, className }) => {
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
      {drinkData && (
        <section className={className}>
          <img src={drinkData.image} alt={drinkData.drink} />
          <div className={`${className}__nameRateWrap`}>
            <h2>{drinkData.drink}</h2>
            <Rating
              className={`${className}__rate`}
              name="rate"
              value={drinkData.rate}
              readOnly
            />
          </div>
          <div className={`${className}__tagList_wrap`}>
            <TagsList tags={drinkData.tags} />
          </div>
          <Button
            className={`${className}__button`}
            label="記録を残す"
            long="long"
            onClick={() => {
              history.push(`/edit/${drinkData.id}`);
            }}
          />
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
          <Button
            className={`${className}__button`}
            label="まとめて削除"
            long="long"
            onClick={() => {
              setDeleteMessage("お酒");
              setOpenModalDelete(true);
              setDeleteDrinkId(drinkId);
            }}
          />
        </section>
      )}
    </>
  );
};

export const Item = styled(FCItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0 65px;
  img {
    width: 302px;
    height: 302px;
  }

  &__nameRateWrap {
    width: 302px;
    h2 {
      font: normal normal normal 17px/29px Hiragino Sans;
      margin-top: 34px;
      letter-spacing: 1.7px;
    }
  }

  &__rate {
    margin-top: 6px;
    font-size: 24px;
    .MuiRating-icon {
      margin-right: 3px;
    }
    .MuiRating-iconFilled {
      color: #ac966f;
    }
    .MuiRating-iconEmpty {
      color: #414040;
    }
  }

  &__tagList_wrap {
    margin-top: 13px;
  }

  &__button {
    margin-top: 13px;
  }
`;
