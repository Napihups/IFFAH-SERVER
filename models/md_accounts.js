const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


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
	},
	module_states: {
		cashInventory : {type: Number, default: 0}
	}
});

const accounts = module.exports = mongoose.model('md_accounts', accountSchema);

module.exports.getAccountById = function(uid, callback) {
	accounts.findById(uid, callback);
}

/** Only for usage of login authentication */
module.exports.validateAccount = function(username, callback) {
	const query = {username: username};
	accounts.findOne(query, callback);
}

module.exports.getAccountByUsername = function(username, callback) {
	const query = {username: username};
	accounts.findOne(query, callback);
}

module.exports.addNewAccount = function(newAcc, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newAcc.password, salt, (err, hash) =>{
			if(err) {
				console.log(err);
			}
			newAcc.password = hash;
			newAcc.save(callback);
		})
	});
}

module.exports.getFinanceModState = function(uid, callback) {
	const query = {_id : uid};
	const filterField = {'module_states' : 1};
	accounts.findOne(query, filterField, callback);
}

module.exports.validatePassword = function(rawPassword, hashPassword, callback) {
		bcrypt.compare(rawPassword, hashPassword, (err, isMatch) =>{
			if(err) throw err;
			callback(null, isMatch);
		});
}


module.exports.validateTakenUsername = function(username, callback) {
	const query = {'username' : username};
	accounts.find(query, callback);
}


module.exports.updateCiModule = function(uid, val, callback) {

	var filter = {_id : uid};
	var updateQuery = { $set: {"module_states.cashInventory" : val}};
	accounts.update(filter, updateQuery, callback);
}

