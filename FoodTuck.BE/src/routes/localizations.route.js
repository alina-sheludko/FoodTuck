const express = require('express');
const localizationsController = require('../controllers/localizations.controller');

const router = express.Router();

router
  .get('/getAll', localizationsController.getAll);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Localizations
 */

/**
 * @swagger
 * /localizations/getAll:
*   get:
 *     summary: Get all localizations
 *     tags: [Localizations]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */