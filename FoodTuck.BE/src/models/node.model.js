const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { pageAliases } = require('../config/node');
const { string } = require('joi');

const nodeSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    pageAlias: {
      type: String,
      enum: pageAliases,
      required: true,
    },
    pageTitle: {
      type: String,
      required: true,
    },
    addToTopNavigation: {
      type: Boolean,
      required: true,
      default: false
    },
    parentId: {
      type: String,
    },
    panels: {
      type: [],
      default: [],
    },
    product: {
      type: Object
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
nodeSchema.plugin(toJSON);
nodeSchema.plugin(paginate);

/**
 * Check if node exists
 * @param {string} url
 * @returns {Promise<boolean>}
 */
 nodeSchema.statics.isExists = async function (url) {
  const node = await this.findOne({ url });
  return !!node;
};

nodeSchema.pre('save', async function (next) {
  const node = this;
  node.url = node.url.replace(/(\?|\#).+/, '');
  next();
});

/**
 * @typedef User
 */
const UNode = mongoose.model('Node', nodeSchema);

module.exports = UNode;
