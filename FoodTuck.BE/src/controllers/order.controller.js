const catchAsync = require('../utils/catchAsync');
const { orderService, productsService } = require('../services');
const { productCategories, productsSortValueFromKey } = require('../config/product');
const url = require('url');
const querystring = require('querystring');

const createOrder = catchAsync(async (req, res) => {
  const data = await orderService.createOrder({...req.body, products: await replaceIdsWithProducts(req.body.products)});
  res.send(data);
});

const updateOrder = catchAsync(async (req, res) => {
  const data = await orderService.updateOrder(req.body);
  res.send(data);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrder(req.params.id);
  res.sendStatus(200);
});

const getOrderById = catchAsync(async (req, res) => {
  const data = await orderService.getOrderById(req.body.id);
  res.send(data);
});

const getOrdersByFilter = catchAsync(async (req, res) => {
  const filter = {...req.body};
  if (filter.id) {
    filter._id = filter.id;
    delete filter.id;
  }
  const data = await orderService.getOrdersByFilter(filter);
  res.send(data);
})

const getAll = catchAsync(async (req, res) => {
  const data = await orderService.getAllOrders();
  res.send({items: data ?? []});
});

const replaceIdsWithProducts = async (ids) => {
  return (await Promise.all(ids.map(async (id) => await productsService.getProductById(id)))).filter(product => !!product)
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrdersByFilter,
  getAll,
};
