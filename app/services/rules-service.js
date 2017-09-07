//import the package
const RuleEngine = require('node-rules');

/*as you can see above we removed the priority
and on properties for this example as they are optional.*/

//sample fact to run the rules on
const fact = {
  userIP: "27.3.4.5",
  name: "user4",
  application: "MOB2",
  userLoggedIn: true,
  transactionTotal: 600,
  cardType: "Credit Card",
};

//define the rules
const rules = [{
  condition: function (R) {
    R.when(this && (this.transactionTotal < 500));
  },
  consequence: function (R) {
    this.result = false;
    R.stop();
  }
}];

const apply = (args, resolve) => {
  const R = new RuleEngine(rules);
  //Now pass the fact on to the rule engine for results
  R.execute(args, result => {
    let message = "Payment Rejected";
    if(result.result)
      message = "Payment Accepted";
    resolve({
      message,
      fact: result,
    });
  });
}

const getRules = resolve => {
  resolve(rules);
};

module.exports = {
  execute: (args) => {
    return new Promise((resolve, reject) => {
      apply(args, resolve)
    })
  },
  addRule: (rule) => {
    rules.push(rule);
    return new Promise((resolve, reject) => {
      getRules(resolve)
    })
  },
  getRules: () => {
    return new Promise((resolve, reject) => {
      getRules(resolve)
    })
  },
  test: (rules, fact) => {
    return new Promise(rs => {
      const R = new RuleEngine();
      R.fromJSON(rules);
      R.execute(fact, r => rs(r));
    });
  },
};
