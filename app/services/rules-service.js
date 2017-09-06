//import the package
var RuleEngine = require('node-rules');

//define the rules
var rules = [{
	"condition": function(R) {
		R.when(this && (this.transactionTotal < 500));
	},
	"consequence": function(R) {
		this.result = false;
		R.stop();
	}
}];
/*as you can see above we removed the priority 
and on properties for this example as they are optional.*/ 

//sample fact to run the rules on	
// var fact = {
//     "userIP": "27.3.4.5",
//     "name":"user4",
//     "application":"MOB2",
//     "userLoggedIn":true,
//     "transactionTotal":600,
//     "cardType":"Credit Card",
// };



module.exports = {
	
	executeRules: function() {
		//initialize the rule engine
		console.log(rules)
		var R = new RuleEngine(rules);
		//Now pass the fact on to the rule engine for results
		return R
	},
	fact: {
		"userIP": "27.3.4.5",
    "name":"user4",
    "application":"MOB2",
    "userLoggedIn":true,
    "transactionTotal":600,
    "cardType":"Credit Card",
	}

}