'use strict';

const path = require('path');
const express = require('express');
const rulesController = require('./controllers/rules-controller');
const bodyParser = require('body-parser');


// Constants
var PORT = process.env.PORT || 8080;
// App
const app = express();

// API routes
var rulesRouter = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routing
rulesRouter.route('/rules/test')
  .post(rulesController.testRules)

rulesRouter.route('/rules/run')
  .post(rulesController.executeRules)

rulesRouter.route('/rules')
  .get(rulesController.getRules)
  .post(rulesController.addRule)


app.use("/api",rulesRouter);
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/*', (req, res) => {
  res.sendfile('index.html', { root: path.join(__dirname, '..', 'build') });
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
