const catchAsync = require('../utils/catchAsync');
const { productsService } = require('../services');
const { productCategories } = require('../config/product');

const createProduct = catchAsync(async (req, res) => {
  const data = await productsService.createProduct(req.body);
  res.send(data);
});

const updateProduct = catchAsync(async (req, res) => {
  const data = await productsService.updateProduct(req.body);
  res.send(data);
});

const deleteProduct = catchAsync(async (req, res) => {
  console.log(req.params)
  await productsService.deleteProduct(req.params.id);
  res.sendStatus(200);
});

const getProductById = catchAsync(async (req, res) => {
  const data = await productsService.getProductById(req.body.id);
  res.send(data);
});

const getAll = catchAsync(async (req, res) => {
  const data = await productsService.getAllProducts();
  res.send({items: data ?? []});
});

const getCategories = catchAsync(async (req, res) => {
  res.send(productCategories);
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAll,
  getCategories,
};
