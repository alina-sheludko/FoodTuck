const catchAsync = require('../utils/catchAsync');
const { nodeService, teamMemberService } = require('../services');
const { allowedChildNodes } = require('../config/node');
const { ourTeamPanelConfig } = require('../config/team-member');


const getByUrl = catchAsync(async (req, res) => {
  const nodeData = await addAditionalDataByAlias(await nodeService.getNodeByUrl(req.query.url));
  res.send(nodeData);
});

const createNode = catchAsync(async (req, res) => {
  const data = {
    ...req.body,
  };
  if (req.body.pageAlias !== 'homePage') {
    const node = await nodeService.getNodeById(req.body.id);
    const parentNode = await nodeService.getNodeById(node.parentId)
    data.url = parentNode.url + req.body.url + '/';
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
    const node = await nodeService.getNodeById(req.body.id);
    const parentNode = await nodeService.getNodeById(node.parentId)
    data.url = parentNode.url + req.body.url + '/';
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
  var urlSegments = node.url.split('/');
  var lastUrlSegment = (urlSegments.pop() || urlSegments.pop()) ?? "";  // handle potential trailing slash
  const data = {
    availablePageTypes: [node.pageAlias],
    formData: {
      id: node._id,
      url: lastUrlSegment,
      pageAlias: node.pageAlias,
      pageTitle: node.pageTitle,
      addToTopNavigation: node.addToTopNavigation,
      panels: node.panels,
    }
  };
  res.send(data)
})

const addAditionalDataByAlias = async (data) => {
  if (data.pageAlias === "ourTeamPage") {
    data = await addOurTeamPageData(data);
  }

  data.panels = data.panels?.map(async (panel) => {
    if (panel.panelAlias === "ourTeamPanel") {
      panel = await addOurTeamPanelData(panel);
    }

    return panel;
  })

  return data;
}

const addOurTeamPageData = async (data) => {
  data.teamMembers = await teamMemberService.getAll();
  return data;
}

const addOurTeamPanelData = async (data) => {
  const [teamMembers, seeMoreLink] = await Promise.all([
    teamMemberService.getPaged(ourTeamPanelConfig.pagesize),
    nodeService.getNodeByAlias('ourTeamPage'),
  ])
  data.teamMembers = teamMembers;
  data.seeMoreLink = seeMoreLink?.url;
  return data;
}

module.exports = {
  getByUrl,
  createNode,
  updateNode,
  deleteNode,
  getAllNodes,
  getCreateFormData,
  getUpdateFormData,
};
