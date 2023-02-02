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
  homePage: ['menuPage', 'shopOverviewPage', 'ourTeamPage', 'basketPage', 'contentPage'],
  menuPage: [],
  shopOverviewPage: ['shopDetailsPage'],
  ourTeamPage: [],
  basketPage: [],
  contentPage: ['contentPage'],
  notFoundPage: [],
};

module.exports = {
  pageAliases,
  allowedChildNodes,
};
