const catchAsync = require('../utils/catchAsync');
const teamMemberService = require('../services/team-member.service');

const getAll = catchAsync(async (req, res) => {
  const teamMembers = await teamMemberService.getAll();
  res.send(teamMembers);
});

const updateAll = catchAsync(async (req, res) => {
  const { teamMembers } = req.body;
  await Promise.all(teamMembers?.map(async member => {
    const existingMember = member.id && await teamMemberService.getById(member.id);
    if (existingMember) {
      await teamMemberService.update(member)
    } else {
      await teamMemberService.create(member)
    }
  }))
  res.sendStatus(200);
});

module.exports = {
  getAll,
  updateAll,
};
