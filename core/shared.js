"use strict";

var Shared = (function() {
  function Shared() {}

  Shared.items = {};

  Shared.set = function(key, value) {
    return this.items[key] = value;
  };

  Shared.get = function(key) {
    return this.items[key];
  };

  return Shared;

})();

module.exports = Shared;
