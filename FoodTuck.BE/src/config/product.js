const productCategories = [
  'Sandwiches',
  'Burger',
  'Chicken Chup',
  'Drink',
  'Pizza',
  'Thi',
  'Non Veg',
];

const productsSortKey = {
  sortByLastUpdated: 0,
  sortByPriceDesc: 1,
  sortByPriceAsc: 2,
}

const productsSortValueFromKey = {
  [productsSortKey.sortByLastUpdated]: {updatedAt: -1},
  [productsSortKey.sortByPriceDesc]: {price: -1},
  [productsSortKey.sortByPriceAsc]: {price: 1},
}

module.exports = {
  productCategories,
  productsSortKey,
  productsSortValueFromKey,
};
