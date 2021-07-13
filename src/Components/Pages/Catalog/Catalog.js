import { useContext, useEffect, useState } from "react";
import firebase from "../../../config/firebase";
import { AuthContext } from "../../utility/AuthService";
import DrinkItem from "./Components/DrinkItem";
import ModalItemChoice from "../../utility/ModalItemChoice";
import ModalRangePicker from "./Components/ModalRangePicker";
import ModalTagChoice from "../../utility/ModalTagChoice";
import Header from "../../utility/Header";
import Footer from "../../utility/Footer";
import styled from "styled-components";

const Catalog = ({ history }) => {
  const [drinks, setDrinks] = useState(null);
  const [openModalItemChoice, setOpenModalItemChoice] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [openModalRangePicker, setOpenModalRangePicker] = useState(false);
  const [openModalTagChoice, setOpenModalTagChoice] = useState(false);
  const [filterTagArray, setFilterTagArray] = useState([]);

  const user = useContext(AuthContext);

  //react-datesの選択期間表示用
  const dateFormat = "YYYY/MM/DD";

  //お酒一覧をソートする処理を定義した関数
  const sortDrinks = (drinks) => {
    //①各お酒のdatesの配列を降順（最新順）にする
    drinks.forEach((drink) => {
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
  };

  //表示期間が指定された時の処理を定義した関数
  const rangeFilterDrinks = (drinks, startDate, endDate) => {
    //react-datesで取れてくる日時は12:00のもの、firestoreのtimestampは9:00なので-3hしたい。
    //momentsで演算を行うと、カレンダーの表示がバグるため、秒で計算
    const second12h = 1 * 60 * 60 * 3;
    const startDate00 = startDate.unix() - second12h;
    const endDate00 = endDate.unix() - second12h;
    drinks.forEach((drink) => {
      //指定期間外のdateを配列から削除する
      drink.dates = drink.dates.filter(
        (date) => startDate00 <= date.seconds && date.seconds <= endDate00
      );
    });
    //datesが１つも存在しないものを除外
    drinks = drinks.filter((drink) => drink.dates.length >= 1);
    return drinks;
  };

  //タグ絞り込み時の処理を定義した関数
  const tagFilterDrinks = (filterTagArray, drinks) => {
    //filterTagArrayの要素を順番にフィルターにかけていく
    filterTagArray.forEach((tag) => {
      drinks = drinks.filter((drink) => drink.tags && drink.tags.includes(tag));
    });
    return drinks;
  };

  //初回レンダリング時（及び依存配列の更新時）に行われる処理
  useEffect(() => {
    if (user != null) {
      const uidDB = firebase.firestore().collection("users").doc(user.uid);
      //お酒一覧取得
      uidDB.collection("drinks").onSnapshot((querySnapshot) => {
        let drinks = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        //範囲指定された時にフィルターをかけたものをdrinksに代入
        if (startDate && endDate) {
          drinks = rangeFilterDrinks(drinks, startDate, endDate);
        }
        //タグで絞り込み時にフィルターをかけたものをdrinksに代入
        if (filterTagArray.length >= 1) {
          drinks = tagFilterDrinks(filterTagArray, drinks);
        }
        //ソート
        sortDrinks(drinks);
        //ソートしたものをセット
        setDrinks(drinks);
      });
    }
  }, [user, startDate, endDate, filterTagArray]);
  console.log(drinks);
  console.log(filterTagArray);

  return (
    <>
      <Header />
      {openModalTagChoice && (
        <ModalTagChoice
          setOpenModalTagChoice={setOpenModalTagChoice}
          user={user}
          setChoiceTagArray={setFilterTagArray}
        />
      )}
      {openModalRangePicker && (
        <ModalRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
          setOpenModalRangePicker={setOpenModalRangePicker}
        />
      )}
      {openModalItemChoice && (
        <ModalItemChoice
          setOpenModalItemChoice={setOpenModalItemChoice}
          history={history}
        />
      )}
      <SCatalogWrap>
        <SFilterWrap>
          <SFilterButton
            start={startDate}
            end={endDate}
            onFocus={() => setOpenModalRangePicker(true)}
          >
            {startDate && endDate
              ? `${startDate.format(dateFormat)} ~ ${endDate.format(
                  dateFormat
                )}`
              : "すべての期間"}
          </SFilterButton>
          <SFilterButton
            flag={filterTagArray.length}
            onClick={() => {
              setOpenModalTagChoice(true);
            }}
          >
            タグで検索
          </SFilterButton>
        </SFilterWrap>
        <SDrinksWrap>
          <ul>
            {drinks &&
              drinks.map((drink) => {
                return (
                  <DrinkItem
                    key={drink.id}
                    id={drink.id}
                    drink={drink.drink}
                    rate={drink.rate}
                    image={drink.image}
                    tags={drink.tags}
                  />
                );
              })}
          </ul>
        </SDrinksWrap>
        <button
          onClick={() => {
            firebase
              .auth()
              .signOut()
              .then(() => history.push("/login"))
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          ログアウト
        </button>
      </SCatalogWrap>
      <Footer
        setOpenModalItemChoice={setOpenModalItemChoice}
        history={history}
      />
    </>
  );
};

const SCatalogWrap = styled.section`
  background-color: #000;
  color: #fff;
  padding: calc(10 / 375 * 100vw) calc(13 / 375 * 100vw);
`;

const SFilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(62 / 375 * 100vw);
  justify-content: space-between;
`;

const SFilterButton = styled.button`
  background-color: #212121;
  color: #ffffff;
  border: none;
  width: calc(193 / 375 * 100vw);
  height: calc(28 / 375 * 100vw);
  font-size: calc(12 / 375 * 100vw);
  letter-spacing: calc(3.6 / 375 * 100vw);
  font-weight: 100;
  border-radius: calc(4 / 375 * 100vw);

  ${({ start, end }) =>
    start &&
    end &&
    `border: 1px solid #fff;
  background-color: #414040;
  letter-spacing: calc(1.2 / 375 * 100vw);
  `}
  ${({ flag }) =>
    flag >= "1" &&
    `border: 1px solid #fff;
  background-color: #414040;
  `}
`;

const SDrinksWrap = styled.div`
  margin-top: calc(19 / 375 * 100vw);
`;

export default Catalog;
