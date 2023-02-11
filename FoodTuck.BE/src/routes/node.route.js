const express = require('express');
const validate = require('../middlewares/validate');
const nodeController = require('../controllers/node.controller');
const nodeValidation = require('../validations/node.validation');

const router = express.Router();

router
  .get('/getByUrl', nodeController.getByUrl)
  .get('/getAll', nodeController.getAllNodes)
  .get('/getCreateFormData/', nodeController.getCreateFormData)
  .get('/getCreateFormData/:parentId', nodeController.getCreateFormData)
  .get('/getUpdateFormData/:id', nodeController.getUpdateFormData)
  .post('/create', validate(nodeValidation.createNode), nodeController.createNode)
  .post('/update/:id', validate(nodeValidation.updateNode), nodeController.updateNode)
  .delete('/delete/:id', nodeController.deleteNode)

module.exports = router;
