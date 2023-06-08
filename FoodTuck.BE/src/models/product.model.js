const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { productCategories } = require('../config/product');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    category: {
      type: String,
      enum: productCategories,
    },
    ingredients: {
      type: String,
    },
    calories: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
