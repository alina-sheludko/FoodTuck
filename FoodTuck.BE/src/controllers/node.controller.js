const catchAsync = require('../utils/catchAsync');
const { nodeService } = require('../services');
const { allowedChildNodes } = require('../config/node');


const getByUrl = catchAsync(async (req, res) => {
  const nodeData = await nodeService.getNodeByUrl(req.params.url);
  res.send(nodeData);
});

const createNode = catchAsync(async (req, res) => {
  const data = {
    ...req.body,
  };
  if (req.body.pageAlias !== 'homePage') {
    data.url = (await nodeService.getNodeById(req.body.parentId)).url + req.body.url + '/';
  }
  const node = await nodeService.createNode(data);
  res.send(node);
})

const getAllNodes = catchAsync(async (req, res) => {
  const nodes = await nodeService.getAllNodes();
  res.send(nodes)
})

const updateNode = catchAsync(async (req, res) => {
  const data = {
    ...req.body,
  };
  if (req.body.pageAlias !== 'homePage') {
    data.url = (await nodeService.getNodeById(req.body.parentId)).url + req.body.url + '/';
  }
  const node = await nodeService.updateNode(data);
  res.send(node);
})

const deleteNode = catchAsync(async (req, res) => {
  await nodeService.deleteNodeRecursive(await nodeService.getNodeById(req.params.id));
  res.sendStatus(200);
})

const getCreateFormData = catchAsync(async (req, res) => {
  if (!req.params.parentId) return res.send({ availablePageTypes: ['homePage'] })

  const node = await nodeService.getNodeById(req.params.parentId)
  const data = {
    availablePageTypes: allowedChildNodes[node.pageAlias],
  };
  res.send(data);
})

const getUpdateFormData = catchAsync(async (req, res) => {
  const node = await nodeService.getNodeById(req.params.id);
  const data = {
    availablePageTypes: [node.pageAlias],
    formData: {
      id: node._id,
      url: node.url.split('/').reverse()[0],
      pageAlias: node.pageAlias,
      pageTitle: node.pageTitle,
      addToTopNavigation: node.addToTopNavigation,
      panels: node.panels,
    }
  };
  res.send(data)
})

module.exports = {
  getByUrl,
  createNode,
  updateNode,
  deleteNode,
  getAllNodes,
  getCreateFormData,
  getUpdateFormData,
};
