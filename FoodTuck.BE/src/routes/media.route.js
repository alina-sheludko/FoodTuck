const express = require('express');
const mediaController = require('../controllers/media.controller');

const router = express.Router();

router
  .post('/upload', mediaController.upload)
  // .delete('/upload', mediaController.delete)

module.exports = router;
