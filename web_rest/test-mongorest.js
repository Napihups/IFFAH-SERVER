const express = require('express');
const router = express.Router();
const config = require('../config/database_config.js');
const checkAuth = require('../middleware/check-auth');

/** Mongo Models - related to this Rest*/
const accounts = require('../models/md_accounts');


/** REST endpoint -------------------------*/
router.get('/a', checkAuth, (req, res, next) => {
	res.json({auth: true, data: "Hello World A"});
})

router.get('/b', checkAuth, (req, res, next) => {
	res.json({auth: true, data: "Hello World B"});
})

router.get('/c', checkAuth, (req, res, next) => {
	res.json({auth: true, data: "Hello World C"});
})

router.get('/d', (req, res, next) => {
	res.json({auth: false, data: "Hello World d"});
})

module.exports = router;
