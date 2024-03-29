const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const addressSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
})

const orderSchema = mongoose.Schema(
  {
    address: {
      type: addressSchema,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
