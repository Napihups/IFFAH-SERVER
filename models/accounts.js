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
	}
});

const accounts = module.exports = mongoose.model('accounts', accountSchema);

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

module.exports.validatePassword = function(rawPassword, hashPassword, callback) {
		bcrypt.compare(rawPassword, hashPassword, (err, isMatch) =>{
			if(err) throw err;
			callback(null, isMatch);
		});
}

