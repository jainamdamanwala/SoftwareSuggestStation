var createError = require('http-errors');
var express = require('express');
var path = require('path');

// We are using handlebase view engine
var hbs = require('hbs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'hbs');

// Register partial folder
hbs.registerPartials(path.join(__dirname, 'server/views/partials'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Our Routes
var indexRouter = require('./server/routes/index');

// Our Paths
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler for errors other than 404
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// Set the port
app.set('port', process.env.PORT || 3000);
let server = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;