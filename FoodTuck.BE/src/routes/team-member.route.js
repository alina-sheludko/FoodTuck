const express = require('express');
const teamMemberController = require('../controllers/team-member.controller');

const router = express.Router();

router
  .get('/getAll', teamMemberController.getAll)
  .post('/update', teamMemberController.updateAll)

module.exports = router;