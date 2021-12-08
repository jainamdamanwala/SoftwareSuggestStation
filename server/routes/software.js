var express = require('express');
var router = express.Router();

var softwareController = require('../data/software');

router.get('/', softwareController.hasAuthorization,
    softwareController.listTopItems);

router.get('/search', softwareController.hasAuthorization,
    softwareController.searchSoftware);

module.exports = router;