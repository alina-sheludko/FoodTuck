const express = require('express');
const localizationsController = require('../controllers/localizations.controller');

const router = express.Router();

router
  .get('/getAll', localizationsController.getAll);

module.exports = router;
