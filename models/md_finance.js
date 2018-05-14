const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** Schema for document (md_accounts)*/

var properties = {
	acc_type : {type : String, required : true},
	renumeration_amount : {type: String, default: '0'},
	setup : {type : String, required : true}
};
var details = {
	fcs_balance : String,
	act_logs : [String],
	liabilities : [String],
	tickets : [String]
};
const financeSchema = mongoose.Schema({
	uid : { type: String, required : true},
	properties : properties,
	details : details
});

const md_finance = module.exports = mongoose.model('md_finance', financeSchema);


// ------------ FUNCTIONS -----------------------------//

/** Getting the finance documents based by the user id provided */
module.exports.getFinanceByUid = function(uid, callback) {
	var query = {uid : uid};
	md_finance.findOne(query, callback);
}

module.exports.startNewFinance = function(mdfinance, callback) {
	mdfinance.save(callback);
}

module.exports.modifiedRenumAmount = function(updateObj, callback) {

		var filter = {uid : updateObj.uid}
		var set_query = { $set: { "properties.renumeration_amount" : updateObj.renum_amount}};

		md_finance.update(filter, set_query, callback);

}