//import the package
var RuleEngine = require('node-rules');

/*as you can see above we removed the priority 
and on properties for this example as they are optional.*/ 

//sample fact to run the rules on	
/*var fact = {
    "userIP": "27.3.4.5",
    "name":"user4",
    "application":"MOB2",
    "userLoggedIn":true,
    "transactionTotal":600,
    "cardType":"Credit Card",
};*/


//define the rules
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

var RuleEngine = new RuleEngine(rules);

var apply = (args, resolve) => {
	//Now pass the fact on to the rule engine for results
	RuleEngine.execute(rules,function(result){ 
		var response = {
			data: "Payment Rejected",
			status: false
		}
		console.log(result)
		if(result.result) {
			response.data = "Payment Accepted"; 
			response.status = true;
		} 
		resolve(response)	
	});
}

var getRules = (resolve) => {
console.log(RuleEngine.toJSON())
	var response = {
			data:  RuleEngine.toJSON(),
			status: true
		}
	resolve(response)
};


var addRule = (rule,resolve) => {
	console.log(rule)
	RuleEngine.fromJSON(rule);
	getRules(resolve)
};



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