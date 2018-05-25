module.exports = function(obj) {

	var module = {};
	var connections = [];
	var logger = obj.logger;
	var app = obj.app;
	const io = require('socket.io').listen(app);

	//MONGOOSE MODELS -------//
	const accounts = require('../models/md_accounts');



	module.startSocket = function() {
		io.set('origin', 'http://locahost:4200');
		io.sockets.on('connection', (clientSocket) => {
			console.log("Accepting new connection from client : " + clientSocket.id);
			connections.push(clientSocket);



			clientSocket.on('ask:ci_state', (uid) => {
				accounts.getFinanceModState(uid, (err, result) => {
					if(!err) {
						let ciState = result.module_states.cashInventory;
						io.emit('give:ci_state', {success: true, payload: ciState});
					} else {
						io.emit('give:ci_state', {success: false, payload: err});
					}
				})
			})





		})
	}


	module.notifyCiState = function(uid) {

		accounts.getFinanceModState(uid, (err, result) => {
			if(!err) {
				let ciState = result.module_states.cashInventory;
				io.emit('give:ci_state', {success: true, payload: ciState});
			} else {
				io.emit('give:ci_state', {success: false, payload: err});
			}
		})
	}


	return module;

}