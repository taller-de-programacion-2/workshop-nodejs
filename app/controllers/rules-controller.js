const Rules = require('../services/rules-service');


exports.test = function(req, res) {
	TVShow.find(function(err, tvshows) {
    if(err) res.send(500, err.message);

    console.log('GET /tvshows')
		res.status(200).jsonp(tvshows);
	});
};

exports.executeRules = (req, res) => {
	var R = rules.executeRules();
  R.execute(rules.fact,function(result){ 
		if(result.result) 
			console.log("\n-----Payment Accepted----\n"); 
		else 
			console.log("\n-----Payment Rejected----\n");
		
	});
}