const Rules = require('../services/rules-service');


var response  = {
	status: 'OK',
	data:{}
}

exports.executeRules = (req, res) => {
	var args = req.body
	Rules.execute(args)
		.then((result) => {
			response.data = result;
	  		res.send(response)
	  	})
}

exports.getRules = (req, res) => {
	Rules.getRules()
		.then((result) => {
			console.log(result)
			response.data = result;
			console.log(response)
	  		res.json(response)
	  	})
}


exports.addRule = (req, res) => {
  	var args = req.body
  	Rules.addRule(args)
		.then((result) => {
			response.data = result;
	  		res.send(response)
	  	})
}