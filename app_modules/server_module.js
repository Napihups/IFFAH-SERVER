module.exports = function(server){

	var module = {};
	var app = server.app;
	var cors = server.cors;
	var logger = server.logger;
	var bodyParser = server.bodyParser;
	var port = server.port;
	var express = server.express;
	var path = server.path;
	const accounts_rest = require('../web_rest/account.rest');
	const test = require('../web_rest/test-mongorest');
	const md_finance = require ('../web_rest/testrest-md_finance');



	function setupRouter() {

		app.use(function(req, res, next) {
		  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
		  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		  next();
		});

		//ALL REST COMPONENTS //
		app.use('/account', accounts_rest);
		app.use('/test', test);
		app.use('/finance', md_finance);
	}

	function setupMiddleware() {
		app.use(cors());
		app.use(bodyParser.json());
	}

	module.init = function(callback) {
		setupMiddleware();
		setupRouter();
		return callback(true);
	};

	return module;
}