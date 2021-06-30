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
      console.log(user.uid);
      firebase
        .firestore()
        .collection(user.uid)
        .onSnapshot((querySnapshot) => {
          const drinks = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setDrinks(drinks);
        });
    }
  }, [user]);
  console.log(drinks);

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
