const fs = require('fs');
const { join } = require('path');

const renderApiUi = (req, res) => {
  res.sendFile(join(process.cwd(), './src/api-ui/index.html'))
}

module.exports = {
  renderApiUi,
};
