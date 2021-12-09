var Software = require('../models/software');

exports.listSoftwares = function (req, res) {
    Software.find().exec(function (error, softwares) {
        if (error) {
            return res.send(400, {
                message: error
            });
        }

        res.render('vendor', {
            title: 'Vendor Page',
            softwares: softwares,
        });
    });
};

exports.createSoftware = function (req, res) {
    var newSoftware = new Software();

    if (!(req.body.name && req.body.tag && req.body.details &&
        req.body.subscriptionPrice && req.body.developerName)) {
        return res.redirect('/vendor');
    }

    newSoftware.name = req.body.name;
    newSoftware.tag = req.body.tag;
    newSoftware.details = req.body.details;
    newSoftware.developerName = req.body.developerName;
    newSoftware.subscriptionPrice = req.body.subscriptionPrice;

    newSoftware.save(function (error) {
        return res.redirect('/vendor');
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role == 0) {
            return next();
        } else {
            res.redirect('/profile');
        }
    }

    res.redirect('/login');
};