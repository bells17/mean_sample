"use strict";

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var util = require('util');
var vsprintf = require('sprintf').vsprintf;
var log4js = require('log4js');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());

app.use(morgan({
  format: 'dev',
  immediate: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// config
var shared = require('./core/shared');
var config = require('./core/config');

// logger
shared.set('logger', log4js.getLogger());
var logger = shared.get('logger');
logger.info('config: '+util.inspect(config));


// mongo
var db = config.mongo.master;
mongoose.connect(vsprintf('mongodb://%s/%s', [db.host, db.dbname]));
logger.info('mongo: '+util.inspect(mongoose));


// routes
app.use('/', routes);
app.use('/users', users);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    logger.warn(util.inspect(err));
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

  process.on('uncaughtException', function(err) {
    var msg;
    msg = 'throw uncaughtException. ';
    if (err && err.stack) {
      msg += err.stack;
    } else {
      msg += err;
    }
    return logger.error(msg);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  logger.warn(util.inspect(err));
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

  process.on('uncaughtException', function(err) {
    var msg;
    msg = 'throw uncaughtException. ';
    if (err && err.stack) {
      msg += err.stack;
    } else {
      msg += err;
    }
    return logger.error(msg);
  });
});

module.exports = app;
