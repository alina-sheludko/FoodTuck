const UNode = require('../models/node.model');

/**
 * Get top navigation nodes
 * @returns {Promise<UNode[]>}
 */
const getTopNavigation = async () => {
  const nodeData = await UNode.find({ addToTopNavigation: true });
  return nodeData?.length ? nodeData : [];
}

module.exports = {
  getTopNavigation,
};
