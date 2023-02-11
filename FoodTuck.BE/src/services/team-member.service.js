const { TeamMember } = require('../models/index');

/**
 * Get all team members
 * @returns {Promise<UNode[]>}
 */
 const getAll = async () => {
  const teamMembers = await TeamMember.find({});
  return teamMembers?.length ? teamMembers : [];
}

/**
 * Get paged team members
 * @param {number} pageSize
 * @returns {Promise<UNode[]>}
 */
const getPaged = async (pageSize) => {
  const teamMembers = await TeamMember.find({}).limit(pageSize);
  return teamMembers?.length ? teamMembers : [];
}

module.exports = {
  getAll,
  getPaged,
};
