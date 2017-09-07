const Rules = require('../services/rules-service');
const serialize = require('serialize-javascript');
const deserialize = str => eval(`(${str})`);

const buildResponse = data => ({
  status: 'OK',
  data,
});

const buildError = err => ({
  status: 'ERROR',
  error: err.toString(),
});

exports.executeRules = (req, res) => {
  const args = req.body
  Rules.execute(args)
    .then(r => {
      console.log(r);
      res.send(buildResponse(r))
    });
}

exports.getRules = (req, res) => {
  Rules.getRules()
    .then(result => {
      console.log(result)
      const response = buildResponse(result.map(r => serialize(r)));
      console.log(response)
      res.json(response)
    });
}

exports.addRule = (req, res) => {
  try {
    const args = deserialize(req.body.rule);
    Rules.addRule(args)
      .then(r => {
        res.json(buildResponse(r.map(r => serialize(r))));
      });
  } catch(e) {
    res.status(400)
      .json(buildError(e));
  }
}

exports.testRules = (req, res) => {
  try {
    const rules = req.body.rules.map(r => deserialize(r));
    const fact = req.body.fact;
    Rules.test(rules, fact)
      .then(r => res.json(buildResponse(r)));
  } catch(e) {
    res.status(400)
      .json(buildError(e));
  }
};

