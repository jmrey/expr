/* jslint node: true */
"use strict";

var util = require('util')  
  , winston = require('winston');


/*
 * @method  dump Log an javascript object.
 * @param   {Object}  object  Obecjt to Inspect.
 * @param   {String}  label   Label for data log.
 * @return  null
 */
var dump = function (obj, label) {
  if ('string' === typeof obj) {
    winston.data(obj.name + " " + obj);
  }

  var keys = Object.keys(obj)
    , list = require('util').inspect(obj, {colors: true});
  
  label = label || 'Inspecting Object';
  
  if (keys.length === 0) {
    return winston.warn('Empty Object');
  } else {
    list = list.replace(/\n\s{2}/ig, '\n  ');
  }

  winston.data(label);
  list.split('\n').forEach(function (line) {
    winston.data(line);
  });
};

module.exports = function (config) {
  winston.cli();
  try {
    winston.remove(winston.transports.Console);
  } catch (ex) {
    console.log('EXCEPTION: Can\'t remove CONSOLE transport on Winston...');
  }

  if (config.logs && config.logs.console) {
    winston.add(winston.transports.Console, {level: config.logs.level, colorize: true});
  }

  winston.dump = dump;
  winston.info('Winston is now logging.');


  return winston;
};

