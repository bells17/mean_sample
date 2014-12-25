"use strict";

var fs = require('fs');
var yaml_config = require('node-yaml-config');
var config_dir = './config/';
var files = fs.readdirSync(config_dir);
var config = {};

for (var i in files) {
  var names = files[i].split('.');
  config[names[0]] = yaml_config.load(config_dir + files[i]);
}

module.exports = config;
