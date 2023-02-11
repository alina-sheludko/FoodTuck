const catchAsync = require('../utils/catchAsync');
const teamMemberService = require('../services/team-member.service');

const getAll = catchAsync(async (req, res) => {
  const teamMembers = await teamMemberService.getAll();
  res.send(teamMembers);
});

module.exports = {
  getAll,
};
