const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const linkSchema = new mongoose.Schema({url: String, name: String})

const siteSettingsSchema = mongoose.Schema(
  {
    footerAboutUs: {
      type: String,
    },
    footerLinks: {
      type: [linkSchema],
      default: []
    },
    learnMoreLinks: {
      type: [linkSchema],
      default: []
    },
    workingHours: {
      type: String
    },
    nonWorkingHours: {
      type: String
    }
  },
);

// add plugin that converts mongoose to json
siteSettingsSchema.plugin(toJSON);

/**
 * @typedef SiteSettings
 */
const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

module.exports = SiteSettings;
