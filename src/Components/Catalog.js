import { useEffect, useState } from "react";
import firebase from "../config/firebase";
// import { AuthContext } from "../AuthServise";
import DrinkItem from "./DrinkItem";
import ModalItemChoice from "./ModalItemChoice";

const Catalog = () => {
  const [drinks, setDrinks] = useState(null);
  const [openModalItemChoice, setOpenModalItemChoice] = useState(false);

  // const user = useContext(AuthContext);
  const user = firebase.auth().currentUser;

  //お酒リストを取ってくる処理
  useEffect(() => {
    if (user != null) {
      firebase
        .firestore()
        .collection(user.uid)
        .onSnapshot((querySnapshot) => {
          const drinks = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          //お酒一覧をソートする処理
          //①各お酒のdatesの配列を降順（最新順）にする
          drinks.forEach((drink, i) => {
            drink.dates.sort((a, b) => b - a);
          });
          //②各お酒の最新の日付を比較してお酒一覧を降順にする
          drinks.sort((a, b) => {
            if (a.dates[0] > b.dates[0]) {
              return -1;
            } else {
              return 1;
            }
          });
          //ソートしたものをセット
          setDrinks(drinks);
        });
    }
  }, [user]);

  return (
    <>
      {openModalItemChoice && (
        <ModalItemChoice
          drinks={drinks}
          setOpenModalItemChoice={setOpenModalItemChoice}
        />
      )}
      <div>
        <h1>ここはCatalogコンポーネントです</h1>
        <button
          onClick={() => {
            setOpenModalItemChoice(true);
          }}
        >
          新規メモ作成
        </button>
        <ul>
          {drinks &&
            drinks.map((drink) => {
              return (
                <DrinkItem
                  key={drink.id}
                  drink={drink.drink}
                  rate={drink.rate}
                  image={drink.image}
                  tags={drink.tags}
                />
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Catalog;
