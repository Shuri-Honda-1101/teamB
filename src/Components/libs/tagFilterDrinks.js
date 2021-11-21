//タグ絞り込み時の処理を定義した関数
export const tagFilterDrinks = (filterTagArray, drinks) => {
  //filterTagArrayの要素を順番にフィルターにかけていく
  filterTagArray.forEach((tag) => {
    drinks = drinks.filter((drink) => drink.tags && drink.tags.includes(tag));
  });
  return drinks;
};
