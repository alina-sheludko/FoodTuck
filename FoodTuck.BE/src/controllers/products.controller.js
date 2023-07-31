const catchAsync = require('../utils/catchAsync');
const { productsService, nodeService } = require('../services');
const { productCategories, productsSortValueFromKey } = require('../config/product');
const url = require('url');
const querystring = require('querystring');

const createProduct = catchAsync(async (req, res) => {
  req.body.price -= req.body.discount;
  const shopOverviewPage = await nodeService.getNodeByAlias('shopOverviewPage');
  const data = await productsService.createProduct({...req.body, url: `${shopOverviewPage.url}${req.body.id}/`});
  await nodeService.createOrUpdateNode({
    pageAlias: 'shopDetailsPage',
    product: data, 
    url: `${'http://placeholder.origin'}${data.url}/`, 
    parentId: shopOverviewPage.id,
    pageTitle: data.name,
  });
  res.send(data);
});

const updateProduct = catchAsync(async (req, res) => {
  req.body.price -= req.body.discount;
  const shopOverviewPage = await nodeService.getNodeByAlias('shopOverviewPage');
  const data = await productsService.updateProduct({...req.body, url: `${shopOverviewPage.url}${req.body.id}/`});
  await nodeService.createOrUpdateNode({
    pageAlias: 'shopDetailsPage',
    product: data, 
    url: `${'http://placeholder.origin'}${data.url}`, 
    parentId: shopOverviewPage.id,
    pageTitle: data.name,
  });
  res.send(data);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productsService.deleteProduct(req.params.id);
  res.sendStatus(200);
});

const getProductById = catchAsync(async (req, res) => {
  const data = await productsService.getProductById(req.body.id);
  res.send(data);
});

const getProductsByFilter = catchAsync(async (req, res) => {
  const data = await getProductsByFilterHandler(req.body);
  res.send(data);
})

const getProductsByFilterHandler = async (filter) => {
  const mappedFilter = {};
  let sortBy = {updatedAt: -1};
  if (filter) {
    if (filter.category) {
      mappedFilter.category = filter.category;
    }
    if (filter.price) {
      mappedFilter.price = {$gte: filter.price[0], $lte: filter.price[1]};
    }
    if (filter.name) {
      mappedFilter.name = new RegExp(filter.name.split(' ').filter(v => !!v).map(v => `(${v})`).join('|'), 'gi');
    }
    if (filter.sortBy) {
      sortBy = productsSortValueFromKey[filter.sortBy];
    }
  };

  return await productsService.getProductsByFilter(mappedFilter, filter.page ?? 0, filter.pageSize ?? 12, sortBy);
}

const getAll = catchAsync(async (req, res) => {
  const data = await productsService.getAllProducts();
  res.send({items: data ?? []});
});

const getCategories = catchAsync(async (req, res) => {
  res.send(productCategories);
});

const getFilterFromQuery = (req) => {
  let parsedUrl = url.parse(decodeURIComponent(req.query.url));
  let parsedQs = querystring.parse(parsedUrl.query);
  const filter = {};

  if (parsedQs) {
    if (parsedQs.category) {
      filter.category = parsedQs.category.split(',').map(cat => decodeURIComponent(cat));
    }
    if (parsedQs.price) {
      filter.price = parsedQs.price.split('-').map(n => Number(n));
    }
    if (parsedQs.name) {
      filter.name = decodeURIComponent(parsedQs.name);
    }
    if (parsedQs.sortBy) {
      filter.sortBy = Number(parsedQs.sortBy);
    }
    if (parsedQs.pageSize) {
      filter.pageSize = Number(parsedQs.pageSize);
    }
    if (parsedQs.page) {
      filter.page = Number(parsedQs.page);
    }
  };

  return filter;
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAll,
  getCategories,
  getProductsByFilter,
  getProductsByFilterHandler,
  getFilterFromQuery,
};
