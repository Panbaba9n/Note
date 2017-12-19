var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var index = require('./routes/index');
var notes = require('./routes/notes');
var notebooks = require('./routes/notebooks');
var registration = require('./routes/registration');
var login = require('./routes/login');
var users = require('./routes/users');

var app = express();


//Set up mongoose connection
var mongoose = require('mongoose');
var dbConfig = require('./config/db.config.js');
mongoose.connect(dbConfig.database, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Define API
app.use('/api/notes', notes);
app.use('/api/notebooks', notebooks);
app.use('/api/registration', registration);
app.use('/api/login', login);
app.use('/api/*', users);
// Define public html
app.get('/*', function (req, res) {
  res.render(__dirname + '/public/index.html');
});


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
