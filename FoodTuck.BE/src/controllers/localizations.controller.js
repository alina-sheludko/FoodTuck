const catchAsync = require('../utils/catchAsync');
const { readFileSync } = require('fs');
const { join } = require('path');

const getAll = catchAsync(async (req, res) => {
  const localizations = readFileSync(join(__dirname, "../assets/localizations/en.json"), {encoding: 'utf8'})
  res.send(localizations);
});

module.exports = {
  getAll,
};
