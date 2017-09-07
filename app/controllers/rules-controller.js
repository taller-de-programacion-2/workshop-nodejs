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
      res.json(buildResponse(serialize(r)))
    });
}

exports.getRules = (req, res) => {
  console.log('getRules')
  Rules.getRules()
    .then(result => {
      const response = buildResponse(serialize(result));
      res.json(response)
    });
}

exports.addRule = (req, res) => {
  try {
    const args = deserialize(req.body.rule);
    Rules.addRule(args)
      .then(r => {
        res.json(buildResponse(serialize(r)));
      });
  } catch(e) {
    res.status(400)
      .json(buildError(e));
  }
}
