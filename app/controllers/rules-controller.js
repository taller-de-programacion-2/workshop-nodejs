const Rules = require('../services/rules-service');

exports.executeRules = (req, res) => {
	var args = {
	    "userIP": "27.3.4.5",
	    "name":"user4",
	    "application":"MOB2",
	    "userLoggedIn":true,
	    "transactionTotal":600,
	    "cardType":"Credit Card",
	};
	Rules.execute(args)
		.then((result) => {
	  		res.send(result)
	  	})
}

exports.getRules = (req, res) => {
  	res.send(Rules.getRules())
}