const pageAliases = [
  'homePage',
  'menuPage',
  'shopOverviewPage',
  'shopDetailsPage',
  'ourTeamPage',
  'basketPage',
  'contentPage',
  'notFoundPage',
];

const allowedChildNodes = {
  homePage: ['menuPage', 'shopOverviewPage', 'ourTeamPage', 'basketPage', 'contentPage', 'notFoundPage'],
  menuPage: [],
  shopOverviewPage: ['shopDetailsPage'],
  ourTeamPage: [],
  basketPage: [],
  contentPage: ['contentPage'],
  notFoundPage: [],
};

const cities = [
  'Kiev',
  'Dnipro',
  'Kharkiv',
  'Lviv',
  'Odessa'
]

module.exports = {
  pageAliases,
  allowedChildNodes,
  cities,
};
