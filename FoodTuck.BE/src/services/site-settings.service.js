const SiteSettings = require('../models/site-settings.model');

/**
 * Get site settings
 * @returns {Promise<SiteSettings>}
 */
 const getSiteSettings = async () => {
  const [siteSettings] = await SiteSettings.find({});
  return siteSettings;
}

/**
 * Update site settings
 * @returns {Promise<SiteSettings>}
 */
const updateSiteSettings = async (newSiteSettings) => {
  const [siteSettings] = await SiteSettings.find({});
  if (siteSettings) {
    await SiteSettings.updateOne({_id: siteSettings._id}, {...siteSettings, ...newSiteSettings}, {upsert: true})
  } else {
    await SiteSettings.create(newSiteSettings)
  }
}

module.exports = {
  getSiteSettings,
  updateSiteSettings,
};
