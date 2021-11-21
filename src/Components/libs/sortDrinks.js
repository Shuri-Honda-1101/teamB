//お酒一覧をソートする処理を定義した関数
export const sortDrinks = (drinks) => {
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
