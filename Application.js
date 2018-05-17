// MAIN APP BACKEND SERVICE INIT PROCESS //
const express = require('express');
const app = express();
const redis = require('redis');
const logger = require('js-logging').console();
const pathModule = require('path');
const bodyParser = require('body-parser');
const corsModule = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database_config.js');

const PORT = 3310;
const redis_PORT = 6379;


/*   START EXPRESS */
var x = app.listen(PORT);

/*  init app modules */
const server = require('./app_modules/server_module')({
	app: app,
	bodyParser: bodyParser,
	cors: corsModule,
	port: PORT,
	logger: logger,
	express: express,
	path: pathModule
});

const mongo = require('./app_modules/mongoose_module')({
	mongoose: mongoose,
	config: config,
	logger: logger
});

const socket = require('./app_modules/socket_module')({
	logger : logger,
	app : x
})

server.init(function(c) {
	if(c){
		console.log("Server started successfully at port : " + PORT);
	} else {
		console.log("Server failed to start up ...")
	}
});

mongo.init();

socket.startSocket();