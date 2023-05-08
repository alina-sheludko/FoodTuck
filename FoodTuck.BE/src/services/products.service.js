const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Product = require('../models/product.model');

/**
 * Create product
 * @param {Product} data
 * @returns {Promise<Product>}
 */
const createProduct = (data) => {
  return Product.create(data)
}

/**
 * Update product
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProduct = async (updateBody) => {
  await Product.updateOne({_id: updateBody.id}, updateBody, {upsert: true});
  return await getProductById(updateBody.id);
};

/**
 * Get product by id
 * @param {string} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
}

/**
 * Delete product by id
 * @param {string} id
 * @returns {Promise<void>}
 */
const deleteProduct = async (id) => {
  await Product.deleteOne({_id: id})
}

/**
 * Get all products
 * @returns {Promise<Product[]>}
 */
const getAllProducts = async () => {
  const products = await Product.find({});
  return products;
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
};
