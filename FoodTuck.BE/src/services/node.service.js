const httpStatus = require('http-status');
const { UNode } = require('../models');
const ApiError = require('../utils/ApiError');
const { v4: uuid } = require("uuid")

/**
 * Create node
 * @param {UNode} data
 * @returns {Promise<UNode>}
 */
const createNode = (data) => {
  data.id = uuid();
  return UNode.create(data)
}

/**
 * Get node data
 * @param {String} url
 * @returns {Promise<UNode>}
 */
const getNodeByUrl = async (url) => {
  const nodeData = await UNode.findOne({url: new URL(url).pathname});
  if (!nodeData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
  }
  return nodeData;
}

/**
 * Update node by id
 * @param {ObjectId} nodeId
 * @param {Object} updateBody
 * @returns {Promise<UNode>}
 */
const updateNode = async (updateBody) => {
  await UNode.updateOne({_id: updateBody.id}, updateBody, {upsert: true});
  return await getNodeById(updateBody.id);
};

/**
 * Get node by id
 * @param {ObjectId} nodeId
 * @returns {Promise<UNode>}
 */
const getNodeById = async (nodeId) => {
  const node = await UNode.findOne({ _id: nodeId });
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }
  return node;
}

/**
 * Delete node by id
 * @param {ObjectId} nodeId
 * @returns {Promise<void>}
 */
const deleteNodeRecursive = async (node) => {
  await node?.remove();
  (await UNode.find({parentId: node.id})).forEach(el => deleteNodeRecursive(el))
}

/**
 * Get all nodes
 * @returns {Promise<UNode[]>}
 */
const getAllNodes = async () => {
  const nodes = await UNode.find({});
  return nodes;
}

module.exports = {
  createNode,
  getNodeByUrl,
  getNodeById,
  updateNode,
  deleteNodeRecursive,
  getAllNodes,
};
