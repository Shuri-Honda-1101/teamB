import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import firebase from "../../libs/firebase";
import { AuthContext } from "../../utility/AuthService";

//components
import { DrinkItem } from "./Components/DrinkItem";
import { ModalRangePicker } from "./Components/ModalRangePicker";
import { ModalTagChoice } from "../../utility/ModalTagChoice";
import { FilterButton } from "../../utility/FilterButton/FilterButton";

//functions
import { sortDrinks } from "../../libs/sortDrinks";
import { rangeFilterDrinks } from "../../libs/rangeFilterDrinks";
import { tagFilterDrinks } from "../../libs/tagFilterDrinks";

export const FCCatalog = ({ className }) => {
  const [drinks, setDrinks] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [openModalRangePicker, setOpenModalRangePicker] = useState(false);
  const [openModalTagChoice, setOpenModalTagChoice] = useState(false);
  const [filterTagArray, setFilterTagArray] = useState([]);

  const user = useContext(AuthContext);

  //react-datesの選択期間表示用
  const dateFormat = "YYYY/MM/DD";

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
  return (
    <div className={className}>
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
      <section className={`${className}__wrap`}>
        <div className={`${className}__filter_wrap`}>
          <FilterButton
            start={startDate}
            end={endDate}
            onFocus={() => setOpenModalRangePicker(true)}
            label={
              startDate && endDate
                ? `${startDate.format(dateFormat)} ~ ${endDate.format(
                    dateFormat
                  )}`
                : "すべての期間"
            }
          />
          <FilterButton
            flag={filterTagArray.length}
            onClick={() => {
              setOpenModalTagChoice(true);
            }}
            label="タグで検索"
          />
        </div>
        <div className={`${className}__drink_wrap`}>
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
        </div>
      </section>
    </div>
  );
};

export const Catalog = styled(FCCatalog)`
  &__wrap {
    background-color: #000;
    color: #fff;
    padding: 10px 13px;
  }
  &__filter_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 62px;
    justify-content: space-between;
  }
  &__drink_wrap {
    margin-top: 19px;
  }
`;
