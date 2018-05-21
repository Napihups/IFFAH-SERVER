const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

/** Models -----------------------------*/
const md_cashInventory = require('../models/md_cashInventory');



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
			res.json({success: true, msg: object});
		}
	})

});




module.exports = router;