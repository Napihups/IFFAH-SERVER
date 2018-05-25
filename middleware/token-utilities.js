module.exports = function(obj) {

	var module = {};
	const jwt = require('jsonwebtoken');
	const config = require('../config/database_config');


	module.getUserIdFromToken = function(token) {
		const decoded = jwt.verify(token, config.secret);
		return decoded.uid;
	}

	module.getUsernameFromToken = function(token) {
		const decoded = jwt.verify(token, config.secret);
		return decoded.username;
	}

	

	module.getUsernameFromReq = function(req) {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, config.secret);
		return decoded.username;
	}

	return module;
}