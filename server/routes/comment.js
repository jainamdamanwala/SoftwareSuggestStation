var express = require('express');
var router = express.Router();

var commentsController = require('../data/comments');

router.post('/', commentsController.hasAuthorization,
    commentsController.create);

module.exports = router;