"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostComment = require('./post_comment');

var shared = require('../core/shared');
var logger = shared.get('logger');


var Post = new Schema({
  title: String,
  body: String,
  date: Date,
  comments: [PostComment],
  metadata: {
    votes: Number,
    favs: Number
  }
});

Post.path('title').validate((function(v, fn) {
  var max_length, min_length;
  min_length = 5;
  max_length = 20;
  if (v == null) {
    return fn(false);
  }
  if (v.length <= min_length) {
    return fn(false);
  }
  if (v.length >= max_length) {
    return fn(false);
  }
}), 'title validate failed');

Post.pre('init', function(next) {
  logger.debug('init done');
  next();
});

Post.pre('save', function(next, done) {
  logger.debug('save done');
  next();
});


mongoose.model('Post', Post);
