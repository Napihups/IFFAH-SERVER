const mongoose = require('mongoose');


/** Schema for document (accounts)*/
const accountSchema = mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const accounts = module.exports = mongoose.model('accounts', accountSchema);

module.exports.getAccountById = function(uid, callback) {
	accounts.findById(uid, callback);
}

module.exports.getAccountByUsername = function(username, callback) {
	const query = {username: username};
	accounts.findOne(query, callback);
}

module.exports.addNewAccount = function(newAcc, callback) {
	newAcc.save(callback);
}
