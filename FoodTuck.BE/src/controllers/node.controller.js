const catchAsync = require('../utils/catchAsync');
const { nodeService, teamMemberService, productsService } = require('../services');
const { allowedChildNodes } = require('../config/node');
const { ourTeamPanelConfig } = require('../config/team-member');
const productsController = require("./products.controller");
const { productCategories, sortingOptions } = require("../config/product");


const getByUrl = catchAsync(async (req, res) => {
  const urlWithoutQueryParams = req.query.url.split('?')[0];

  let data = await nodeService.getNodeByUrl(urlWithoutQueryParams + (/\/$/.test(urlWithoutQueryParams) ? '' : '/'));
  data = data.toObject();

  const nodeData = await addAditionalDataByAlias(data, req);

  res.send(nodeData);
});

const createNode = catchAsync(async (req, res) => {
  const data = {
    ...req.body,
  };
  if (req.body.pageAlias !== 'homePage') {
    const parentNode = await nodeService.getNodeById(req.body.parentId)
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
  var lastUrlSegment = (urlSegments.pop() || urlSegments.pop()) || "/";  // handle potential trailing slash
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

const addAditionalDataByAlias = async (data, req) => {
  if (data.pageAlias === "ourTeamPage") {
    data = await addOurTeamPageData(data);
  }
  if (data.pageAlias === "shopOverviewPage") {
    data = await addShopOverviewPageData(data, req);
  }
  if (data.pageAlias === "shopDetailsPage") {
    data = await addShopDetailsPageData(data, req);
  }
  data.panels = await Promise.all(
    data.panels?.map(async (panel) => {
      if (panel.panelAlias === "ourTeamPanel") {
        panel = await addOurTeamPanelData(panel);
      }

      return panel;
    })
  )

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

const addShopOverviewPageData = async (data, req) => {
  const filter = productsController.getFilterFromQuery(req);
  data.products = await productsController.getProductsByFilterHandler(filter);
  data.categories = productCategories;
  const allProducts = await productsService.getAllProducts({price: 1});
  data.prices = {
    min: allProducts[0].price,
    max: allProducts[allProducts.length-1].price,
  }
  data.sortingOptions = sortingOptions;
  data.pageSize = filter.pageSize || 12;
  return data;
}

const addShopDetailsPageData = async (data, req) => {
  const segments = new URL(req.query.url).pathname.split('/');
  const id = segments.pop() || segments.pop();
  data.product = await productsService.getProductById(id);
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
