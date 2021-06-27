import { useEffect, useState } from "react";
import firebase from "../config/firebase";
// import { AuthContext } from "../AuthServise";
import { Link } from "react-router-dom";
import DrinkItem from "./DrinkItem";

const Catalog = () => {
  const [drinks, setDrinks] = useState(null);

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
    <div>
      <h1>ここはCatalogコンポーネントです</h1>
      <Link to="/edit">新規メモ作成</Link>
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
  );
};

export default Catalog;
