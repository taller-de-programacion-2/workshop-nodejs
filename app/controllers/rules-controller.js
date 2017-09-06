//GET - Return all tvshows in the DB
const Rules = require('../rules');

module.exports.executeRules = function(req, res) {
  TVShow.find(function(err, tvshows) {
    if(err) res.send(500, err.message);

    console.log('GET /tvshows')
    res.status(200).jsonp(tvshows);
  });
};

exports.executeRules = (req, res) => {
  const R = Rules.executeRules();
  //  R.execute(rules.fact,function(result){
  //  if(result.result)
  //    console.log("\n-----Payment Accepted----\n");
  //  else
  //    console.log("\n-----Payment Rejected----\n");
  // });
}
