const express = require('express');
const apiUiController = require('../controllers/api-ui.controller');

const router = express.Router();

router
  .get('*', apiUiController.renderApiUi)

module.exports = router;
