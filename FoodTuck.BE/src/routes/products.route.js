const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router
  .post('/create', productsController.createProduct)
  .post('/update', productsController.updateProduct)
  .delete('/delete/:id', productsController.deleteProduct)
  .post('/getById', productsController.getProductById)
  .post('/getByFilter', productsController.getProductsByFilter)
  .get('/getAll', productsController.getAll)
  .get('/getCategories', productsController.getCategories)

module.exports = router;
