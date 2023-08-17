const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Order = require('../models/order.model');

/**
 * Create order
 * @param {Order} data
 * @returns {Promise<Order>}
 */
const createOrder = (data) => {
  return Order.create(data)
}

/**
 * Update order
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrder = async (updateBody) => {
  await Order.updateOne({_id: updateBody.id}, updateBody, {upsert: true});
  return await getOrderById(updateBody.id);
};

/**
 * Get order by id
 * @param {string} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
}

/**
 * Delete order by id
 * @param {string} id
 * @returns {Promise<void>}
 */
const deleteOrder = async (id) => {
  await Order.deleteOne({_id: id})
}

/**
 * Get orders by filter
 * @param {Object} filter
 * @returns {Promise<Order[]>}
 */
const getOrdersByFilter = async (filter) => {
  const orders = await Order.find(filter);
  if (!orders?.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Orders not found');
  }
  return orders;
}

/**
 * Get all orders
 * @returns {Promise<Order[]>}
 */
const getAllOrders = async () => {
  const orders = await Order.find({});
  return orders;
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getAllOrders,
  getOrdersByFilter,
};
