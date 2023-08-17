const express = require('express');
const orderController = require('../controllers/order.controller');
const validate = require('../middlewares/validate');
const orderValidator = require('../validations/order.validation');

const router = express.Router();

router
  .post('/create', validate(orderValidator.createOrUpdate), orderController.createOrder)
  .post('/update', validate(orderValidator.createOrUpdate), orderController.updateOrder)
  .delete('/delete/:id', orderController.deleteOrder)
  .post('/getById', orderController.getOrderById)
  .post('/getByFilter', orderController.getOrdersByFilter)
  .get('/getAll', orderController.getAll)


module.exports = router;
