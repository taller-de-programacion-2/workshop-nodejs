//import the package
var RuleEngine = require('node-rules');

/*as you can see above we removed the priority 
and on properties for this example as they are optional.*/ 

//sample fact to run the rules on	
var fact = {
    "userIP": "27.3.4.5",
    "name":"user4",
    "application":"MOB2",
    "userLoggedIn":true,
    "transactionTotal":600,
    "cardType":"Credit Card",
};

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


var apply = (args, resolve) => {
	var R = new RuleEngine(rules);
	//Now pass the fact on to the rule engine for results
	R.execute(fact,function(result){ 
		var message = "Payment Rejected"; 
		if(result.result) 
			message = "Payment Accepted"; 
		resolve(message)	
	});
}

var getRules = (resolve) => {
	resolve(rules)
};

module.exports = {
	execute: (args) => {
		return new Promise((resolve, reject) => {
			apply(args,resolve)
		})
	},
	addRule: (rule) => {
		return new Promise((resolve, reject) => {
			getRules(resolve)
		})
	},
	getRules: () => {
		return new Promise((resolve, reject) => {
			getRules(resolve)
		})
	}

}