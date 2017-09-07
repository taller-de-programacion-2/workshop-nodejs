//import the package
var RuleEngine = require('node-rules');

//define the rules
var RuleManager = new RuleEngine();

var rules = [
{
	"name": "transaction minimum",
	"priority": 3,
	"on" : true,
	"condition": function(R) {
		R.when(this.transactionTotal < 500);
	},
	"consequence": function(R) {
		this.result = false;
		R.stop();
	}
}];



var init = () => {
	RuleManager.register(rules)
}

var apply = (args, resolve) => {
	console.log("apply",args)
	//Now pass the fact on to the rule engine for results
	RuleManager.execute(args,function(result){ 
		console.log("apply-result",result)
		var response = {
			result: "Payment Rejected"
		}
		if(result.result) {
			response.result = "Payment Accepted"; 
		} 
		resolve(response)	
	});
}

var getRules = (resolve) => {
	var response = {
			rules:  RuleManager.toJSON()
		}
	resolve(response)
};


var addRule = (rule,resolve) => {
	rules.push(rule)
	//TODO
	RuleManager.register(rule);
	getRules(resolve)
};

/*  INIT */
init();

module.exports = {

	execute: (args) => {
		return new Promise((resolve, reject) => {
			apply(args,resolve)
		})
	},
	addRule: (rule) => {
		return new Promise((resolve, reject) => {
			addRule(rule,resolve)
		})
	},
	getRules: () => {
		return new Promise((resolve, reject) => {
			getRules(resolve)
		})
	}

}
