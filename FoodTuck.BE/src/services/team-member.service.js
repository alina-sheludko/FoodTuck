const { TeamMember } = require('../models/index');

/**
 * Get all team members
 * @returns {Promise<TeamMember[]>}
 */
 const getAll = async () => {
  const teamMembers = await TeamMember.find({});
  return teamMembers ?? [];
}

/**
 * Get paged team members
 * @param {number} pageSize
 * @returns {Promise<TeamMember[]>}
 */
const getPaged = async (pageSize) => {
  const teamMembers = await TeamMember.find({}).limit(pageSize);
  return teamMembers?.length ? teamMembers : [];
}

/**
 * Get team member by id
 * @param {string} memberId
 * @returns {Promise<TeamMember>}
 */
const getById = async (memberId) => {
  return (await TeamMember.findOne({ _id: memberId})) ?? null;
}

/**
 * Create team member
 * @param {TeamMember} member
 * @returns {Promise<TeamMember>}
 */
const create = async (member) => {
  const createdMember = await TeamMember.create(member);
  return createdMember;
}

/**
 * Update team member
 * @param {TeamMember} member
 * @returns {Promise<TeamMember>}
 */
const update = async (member) => {
  const updatedMember = await TeamMember.updateOne({id: member.id}, member);
  return updatedMember;
}

module.exports = {
  getAll,
  getPaged,
  getById,
  create,
  update,
};
