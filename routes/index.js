"use strict";

var express = require('express');
var router = express.Router();

var util = require('util');
var shared = require('../core/shared');
var logger = shared.get('logger');
var params = require('params');

var mongoose = require('mongoose');
require('../models/post');
var Post = mongoose.model('Post');

router.all('*', function(req, res, next) {
	logger.debug('all before'+util.inspect({
		'get': req.query,
		'post': req.post,
	}));
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	logger.debug('get / first');
	next();
});

/* GET home page. */
router.get('/', function(req, res) {
	var data = {
		'title': 'Express',
	};

	var flash = req.flash('info');
	logger.debug('flash: '+util.inspect(flash));

	// mongoose.connect('localhost/mean_sample');

	var post = new Post();
  // post.title = checked_params.title;
  // post.body = checked_params.body;

  post.title = 'aaaaaaaaaaaa';
  post.body = 'lfbnaelbnalnva';
  post.date = new Date;

  post.save(function(err) {
    res.redirect('/');
    res.render('index', data);
  });
  return;
	Post.find({'title': 'title'}, function(err, records) {
		logger.debug(util.inspect(err, records));
    data.records = records;
    logger.debug(data);
    logger.debug('aaaaaaaaaaaaa');
    res.render('index', data);
  });

});

router.get('/flash', function(req, res) {
  var checked_params = params(req.body).only('title', 'body', 'test');
  logger.debug('checked params:' + util.inspect(checked_params));

  req.flash('info', 'Flash is back!');

  var post = new Post();
  // post.title = checked_params.title;
  // post.body = checked_params.body;

  post.title = 'aaaaaaaaaaaa';
  post.body = 'lfbnaelbnalnva';

  post.save(function(err) {
    res.redirect('/');
    if (err) {
      switch (err.name) {
        case 'ValidationError':
          logger.info('failed because ValidationError'+util.inspect(err));
          req.flash('err', 'failed because ValidationError');
          break;
        default:
          logger.error('failed because other error'+util.inspect(err));
					req.flash('err', 'failed because other error');
      }
      return res.redirect('/');
    }
    logger.debug('saved!');
    res.redirect('/');
  });
});

module.exports = router;
