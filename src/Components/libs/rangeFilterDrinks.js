//表示期間が指定された時の処理を定義した関数
export const rangeFilterDrinks = (drinks, startDate, endDate) => {
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
