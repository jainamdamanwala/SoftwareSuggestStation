var express = require('express');
var router = express.Router();

var contactUsController = require('../data/contactUs');

router.get('/', contactUsController.getContactUsPage);

router.post('/', contactUsController.createQuery);

module.exports = router;
