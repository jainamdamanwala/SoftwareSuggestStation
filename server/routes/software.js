var express = require('express');
var router = express.Router();

var softwareController = require('../data/software');

router.get('/', softwareController.hasAuthorization,
    softwareController.listTopItems);

router.get('/search', softwareController.hasAuthorization,
    softwareController.searchSoftware);

router.get('/:id', softwareController.hasAuthorization,
    softwareController.getSoftwareById);

module.exports = router;
