const express = require('express');
const router = express.Router();

/** Models -----------------------------*/
const md_finance = require('../models/md_finance');


router.post('/new', (req, res, next) => {

	var financeModel = new md_finance({
		uid : req.body.uid,
		properties : {
			acc_type : req.body.properties.acc_type,
			setup : req.body.properties.setup_command
		},
		details : {
			act_logs : ['log_1 : finance module recently started and initialized '],
			liabilities : ['Theres no liabilities yet in this particular finance '],
			tickets : ['Theres no tickets yet in this particular finance ']
		}
	})

	console.log(financeModel); 

	md_finance.startNewFinance(financeModel, (err, object) => {
		if(err) {
			res.json({success: false, msg: err});
		} else {
			res.json({success : true, msg : object});
		}
	});


});

router.post('/change/renum', (req, res,next) => {

		var newRenumAmount = req.body.renum_amount;
		var uid = req.body.uid;
		var updateObj = {
			uid: uid,
			renum_amount: newRenumAmount
		}
		md_finance.modifiedRenumAmount(updateObj, (err, object) => {
			if(err){
				res.json({success: false, msg: err});
			} else {
				res.json({success: true, msg: object});
			}
		})
})



module.exports = router;