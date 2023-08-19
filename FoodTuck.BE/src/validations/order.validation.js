const Joi = require('joi');

const addressSchema = {
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required()
}

const createOrUpdate = {
  body: Joi.object().keys({
    address: Joi.object().keys(addressSchema).required(),
    products: Joi.array().items(Joi.string()).required().min(1),
  })
}

module.exports = {
  createOrUpdate,
};
