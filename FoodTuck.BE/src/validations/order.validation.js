const Joi = require('joi');

const addressSchema = {
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  company: Joi.string(),
  city: Joi.string().required(),
  address: Joi.string().required()
}

const createOrUpdate = {
  body: Joi.object().keys({
    address: Joi.object().keys(addressSchema).required(),
    billingAddress: Joi.when(Joi.ref('isBillingAddressSame'), {
      is: false,
      then: Joi.object().keys(addressSchema),
      otherwise: null,
    }),
    isBillingAddressSame: Joi.boolean().required(),
    products: Joi.array().items(Joi.string()).required().min(1),
  })
}

module.exports = {
  createOrUpdate,
};
