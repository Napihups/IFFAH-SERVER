const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const tokenUtil = require('../middleware/token-utilities')();

/** Models -----------------------------*/
const md_cashInventory = require('../models/md_cashInventory');
const accounts = require('../models/md_accounts');
const socket = require('../app_modules/socket_module.js');



//-------- REST ENDPOINT ------------------------------------//
router.post('/start', checkAuth, (req, res, next) => {
	
	var cashInventoryModel = new md_cashInventory({
		uid : req.body.uid,
		properties : {
			acc_type : req.body.properties.acc_type,
			renumeration_amount : req.body.properties.renumeration_amount,
			setup : req.body.properties.setup_command
		},
		details : {
			act_logs : [],
			liabilities : [],
			tickets : []
		}
	})
	console.log("Info : cashInventoryModel is created : " + cashInventoryModel);
	md_cashInventory.startCashInventory(cashInventoryModel, (err, object) => {
		if(err){
			res.json({success: false, msg: err});
		} else {
			// push notif on cash inventory module activated 
			// console.log(tokenUtil);
			let tokenReq = req.headers.authorization;
			let uid = tokenUtil.getUserIdFromToken(tokenReq);
			console.log('Test token util : ' + uid);
			socket.updateFinanceCreation(uid, 1);
			res.json({success: true, msg: object});
		}
	})

});




module.exports = router;