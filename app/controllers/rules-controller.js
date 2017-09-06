const Rules = require('../services/rules-service');


exports.test = function(req, res) {
	TVShow.find(function(err, tvshows) {
    if(err) res.send(500, err.message);

    console.log('GET /tvshows')
		res.status(200).jsonp(tvshows);
	});
};

exports.executeRules = (req, res) => {
  Rules.execute()
  .then((result) => {
  	res.send(result)
  })
}