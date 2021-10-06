'use strict'
var twillioController = require('./twilo_ctrl');
var express = require('express');

var router = express.Router();

router.route(`/test`).get(twillioController.sendMessage);


module.exports = router;

