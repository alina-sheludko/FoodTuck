const Joi = require('joi');
const { isValidNodeUrl } = require('./custom.validation');

const getByUrl = {
  query: Joi.object().keys({
    url: Joi.string().required(),
  }),
};

const createNode = {
  body: Joi.object().keys({
    pageAlias: Joi.string().required(),
    url: Joi.when(Joi.ref('pageAlias'), {
      is: 'homePage',
      then: Joi.string().required().pattern(new RegExp('/')),
      otherwise: Joi.string().required().custom(isValidNodeUrl),
    }),
    addToTopNavigation: true,
    pageTitle: Joi.string().required(),
    parentId: Joi.string().optional(),
  }),
};

const updateNode = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    pageAlias: Joi.string().required(),
    url: Joi.when(Joi.ref('pageAlias'), {
      is: 'homePage',
      then: Joi.string().required().pattern(new RegExp('/')),
      otherwise: Joi.string().required().custom(isValidNodeUrl),
    }),
    addToTopNavigation: true,
    pageTitle: Joi.string().required(),
    parentId: Joi.string().optional(),
    panels: Joi.array().optional(),
  }),
};

module.exports = {
  getByUrl,
  createNode,
  updateNode,
};
