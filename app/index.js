'use strict';

const express = require('express');
const rulesController = require('controllers/rules-controller');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// API routes
var rulesRouter = express.Router();

// Routing
rulesRouter.route('/rules')
  .get(rulesController.executeRules)

app.use("/api",rulesRouter);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);