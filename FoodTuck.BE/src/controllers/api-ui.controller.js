const fs = require('fs');
const { join } = require('path');
const catchAsync = require('../utils/catchAsync');
const { nodeService } = require('../services');
const { pageAliases } = require('../config/node');

const renderApiUi = (req, res) => {
  res.sendFile(join(process.cwd(), './src/api-ui/index.html'))
}

module.exports = {
  renderApiUi,
};
