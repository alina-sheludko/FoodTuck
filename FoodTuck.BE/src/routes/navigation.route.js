const express = require('express');
const navigationController = require('../controllers/navigation.controller');

const router = express.Router();

router
  .get('/top', navigationController.getTopNavigation);

module.exports = router;
