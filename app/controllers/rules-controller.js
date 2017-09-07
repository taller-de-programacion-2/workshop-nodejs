const Rules = require('../services/rules-service');

var getHTTPStatus = (status) => {
	return (status) ? 200 : 400; 
}

var buildResponse = (data) => {
	return {data:data}
}

var executeResponse = (response,result) => {
	response.status(getHTTPStatus(result.status))
			.json(buildResponse(result.data));
}

exports.executeRules = (req, res) => {
	var args = req.body
	Rules.execute(args)
		.then((result) => {
	  		executeResponse(res,result);
	  	})
}

exports.getRules = (req, res) => {
	Rules.getRules()
		.then((result) => {
			executeResponse(res,result);
	  	})
}


exports.addRule = (req, res) => {
  	var args = req.body
  	Rules.addRule(args)
		.then((result) => {
			executeResponse(res,result);
	  	})
}