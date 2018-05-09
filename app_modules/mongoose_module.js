module.exports = function(obj) {
	var module = {};

	var mongoose = obj.mongoose;
	var config = obj.config;
	var logger = obj.logger;



	// Init MongoDB Connection
	let initMongoDB = function() {
		mongoose.connect(config.database_uri_test);

		mongoose.connection.on('connected', () => {
			logger.info('Connected to MongoDB ' + config.database_uri_test);
		});

		mongoose.connection.on('error', (err) => {
			logger.debug('Error connecting to Mongo Atlas ' + err);
		});
	}

	module.init = () =>{
		initMongoDB();
	}

	return module;
}