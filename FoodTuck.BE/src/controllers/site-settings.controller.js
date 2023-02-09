const catchAsync = require('../utils/catchAsync');
const siteSettingsService = require('../services/site-settings.service');

const get = catchAsync(async (req, res) => {
  const siteSettings = await siteSettingsService.getSiteSettings();
  res.send(siteSettings);
});

const update = catchAsync(async (req, res) => {
  await siteSettingsService.updateSiteSettings(req.body);
  res.sendStatus(200);
});

module.exports = {
  get,
  update,
};
