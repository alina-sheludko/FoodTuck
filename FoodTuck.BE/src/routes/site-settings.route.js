const express = require('express');
const siteSettingsController = require('../controllers/site-settings.controller');

const router = express.Router();

router
  .get('/get', siteSettingsController.get)
  .post('/update', siteSettingsController.update);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: SiteSettings
 */

/**
 * @swagger
 * /site-settings/get:
*   get:
 *     summary: Get site settings
 *     tags: [SiteSettings]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /site-settings/update:
*   post:
 *     summary: Update site settings
 *     tags: [SiteSettings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               aboutUs:
 *                 type: string
 *               workingHours:
 *                 type: string
 *               nonWorkingHours:
 *                 type: string
 *               footerLinks:
 *                 type: Array
 *               learnMoreLinks:
 *                 type: Array
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */