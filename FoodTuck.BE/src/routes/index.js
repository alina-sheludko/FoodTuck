const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const nodeRoute = require('./node.route');
const navigationRoute = require('./navigation.route');
const localizationsRoute = require('./localizations.route');
const siteSettingsRoute = require('./site-settings.route');
const teamMemberRoute = require('./team-member.route');
const mediaRoute = require('./media.route');
const apiUiRoute = require('./api-ui.route');
const docsRoute = require('./docs.route');
const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/node',
    route: nodeRoute,
  },
  {
    path: '/navigation',
    route: navigationRoute,
  },
  {
    path: '/localizations',
    route: localizationsRoute,
  },
  {
    path: '/site-settings',
    route: siteSettingsRoute,
  },
  {
    path: '/team-member',
    route: teamMemberRoute,
  },
  {
    path: '/media',
    route: mediaRoute,
  },
  {
    path: '/ui',
    route: apiUiRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
