const express = require('express');
const router = express.Router();
const config = require('../config/database_config.js');

/** Mongo Models - related to this Rest*/
const accounts = require('../models/accounts');


/** REST endpoint -------------------------*/
router.post('/register', (req, res, next) => {
	
	let newAcc = new accounts({
		username : req.body.username,
		email : req.body.email,
		password : req.body.password,
		marital_status : req.body.marital_status,
		jduefefe : "kcec efef",
		cjdcuecehefe: "kdcuec ece"
	});

	accounts.addNewAccount(newAcc, (err, user) => {
		if(err){
			res.json({success: false, msg: err});
		} else {
			res.json({success: true, msg: user});
		}
	});
})

router.get('/user', (req, res, next) => {

	let userId = req.param('uid');
	accounts.getAccountById(userId, function(err, result) {
		if(err){
			res.json({success:false, msg: err});
		} else {
			res.json({success: true, msg: result});
		}
	})

})

module.exports = router;
