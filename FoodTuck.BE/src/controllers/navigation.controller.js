const catchAsync = require('../utils/catchAsync');
const { navigationService } = require('../services');

const getTopNavigation = catchAsync(async (req, res) => {
  const nodeData = await navigationService.getTopNavigation();
  res.send(nodeData?.map(el => ({name: el.pageTitle, url: el.url})));
});

module.exports = {
  getTopNavigation,
};
