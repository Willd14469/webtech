var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var env = require('dotenv').load();

var index = require('./routes/index');
var gallery = require('./routes/gallery');
var login = require('./routes/login');
// var signup = require('./routes/signup');
var about = require('./routes/about');
var trips = require('./routes/trips');
var app = express();



// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions.

app.use('/', index);
app.use('/gallery', gallery);
app.use('/login', login);
// app.use('/signup', signup);
app.use('/about', about);
app.use('/trips', trips);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
