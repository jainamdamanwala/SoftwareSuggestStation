var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Welcome to software suggestion'
	});
});

/* GET login page. */
router.get('/login', function (req, res, next) {
	res.render('login', {
		title: 'Login Page',
		message: req.flash('loginMessage')
	});
});

/* POST login */
router.post('/login', passport.authenticate('local-login', {
	failureRedirect: '/login',
	failureFlash: true,
    successRedirect:'/'
}));

/* GET Signup */
router.get('/signup', function (req, res) {
	res.render('signup', {
		title: 'Signup Page',
		message: req.flash('signupMessage')
	});
});

/* POST Signup */
router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));

/* GET Logout Page */
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

/* check if user is logged in */
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = router;