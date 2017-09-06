'use strict';

const express = require('express');
const rules = require('./rules');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/rules', (req, res) => {
  var R = rules.executeRules();
  R.execute(rules.fact,function(result){ 
		if(result.result) 
			console.log("\n-----Payment Accepted----\n"); 
		else 
			console.log("\n-----Payment Rejected----\n");
		
	});
  res.send("OK");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);