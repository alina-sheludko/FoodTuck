const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const teamMemberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    }
  },
);

// add plugin that converts mongoose to json
teamMemberSchema.plugin(toJSON);

/**
 * @typedef TeamMember
 */
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
