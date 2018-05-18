const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database_config.js');

/** Models -----------------------------*/
const accounts = require('../models/md_accounts');


/** WEB REST ENDPOINT ---------------------------------*/
router.post('/register', (req, res, next) => {
	let newAcc = new accounts({
		username : req.body.username,
		email : req.body.email,
		password : req.body.password
	});

	accounts.addNewAccount(newAcc, (err, account) =>{
		if(err){
			res.json({success: false, msg: err});
		} else {
			res.json({success: true, msg: "Success : " + account});
		}
	})
})


router.post('/login', (req, res, next) => {
	const principle = req.body.username;
	const password = req.body.password;

	accounts.validateAccount(principle, (err, acc) => {
		if(!acc){
			res.json({success: false, msg: "Invalid username or password "});
		} else {
			/** compare credential if its match */
			accounts.validatePassword(password, acc.password, (err, isMatch) => {
				if(!isMatch || err){
					return res.json({success: false, msg: 'Invalid username or password'});
				} else {
					const token = jwt.sign({
						uid : acc._id,
						username : acc.username
					},
					config.secret,
					{
						expiresIn: "5hr"
					}
					);
					let accSession = {
						uid: acc._id,
						username: acc.username,
						module_states : {
							finance : acc.module_states.finance
						}
					}

					res.json({success: true, acc: accSession, token: token});
				}
			});
		}
	});
});


module.exports = router;
