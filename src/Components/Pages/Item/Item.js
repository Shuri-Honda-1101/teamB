import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utility/AuthService";
import firebase from "../../../config/firebase";
import TagList from "../../utility/TagsList";
import MemoListItem from "./Components/MemoListItem";

const Item = () => {
  const [drinkData, setDrinkData] = useState(null);
  const [memos, setMemos] = useState(null);

  const drinkId = useParams().did;
  const user = useContext(AuthContext);

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
          console.log(memos);
          setMemos(memos);
        });
    }
  }, [user, drinkId]);
  console.log(drinkData);
  console.log(memos);

  return (
    drinkData && (
      <div>
        <img src={drinkData.image} height={200} alt={drinkData.drink} />
        <h1>{drinkData.drink}</h1>
        <h2>レーティング: {drinkData.rate}</h2>
        <button>今日飲んだ！</button>
        <TagList tags={drinkData.tags} />
        <div>
          <ul>
            {memos &&
              memos.map((memo) => {
                return (
                  <MemoListItem
                    key={memo.id}
                    drinkId={drinkId}
                    id={memo.id}
                    memo={memo.memo}
                    date={memo.YMDDate}
                  />
                );
              })}
          </ul>
        </div>
        <button>まとめて削除</button>
      </div>
    )
  );
};

export default Item;
