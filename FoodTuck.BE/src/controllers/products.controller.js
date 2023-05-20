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

const getProductsByFilter = catchAsync(async (req, res) => {
  const filter = {};
  let sortBy = {updatedAt: -1};
  if (req.body) {
    if (req.body.category) {
      filter.category = req.body.category;
    }
    if (req.body.price) {
      filter.price = {$gt: req.body.price[0], $lt: req.body.price[1]};
    }
    if (req.body.name) {
      filter.name = new RegExp(req.body.name.split(' ').filter(v => !!v).map(v => `(${v})`).join('|'), 'gi');
    }
    if (req.body.sortBy) {
      sortBy = req.body.sortBy;
    }
  };
  const data = await productsService.getProductsByFilter(filter, req.body.page ?? 0, req.body.pageSize ?? 12, sortBy);
  res.send(data);
})

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
  getProductsByFilter,
};
