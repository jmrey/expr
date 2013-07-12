/* jslint node: true */
"use strict";

var io = require('socket.io');

module.exports = function (instance) {
  return io.listen(instance.server);
};