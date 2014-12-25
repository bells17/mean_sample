"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shared = require('../core/shared');
var logger = shared.get('logger');

var PostComment = (function() {

  var  PostComment = new Schema({
    title: String,
    body: String,
    date: Date
  });

})();

module.exports = PostComment;
