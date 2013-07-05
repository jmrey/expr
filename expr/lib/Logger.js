/* jslint node: true */
"use strict";

var winston = require('winston')
  , eyes = require('winston/node_modules/eyes')
  , inspect = eyes.inspector({ stream: null,
    styles: {               // Styles applied to stdout
      all:     null,        // Overall style applied to everything
      label:   'underline', // Inspection labels, like 'array' in `array: [1, 2, 3]`
      other:   'inverted',  // Objects which don't have a literal representation, such as functions
      key:     'yellow',      // The keys in object literals, like 'a' in `{a: 1}`
      special: 'red',      // null, undefined...
      number:  'cyan',      // 1, 2, 3, etc
      bool:    'magenta',   // true false
      regexp:  'green',     // /\d+/
      string:  'green'
    }
  });

function Logger(config) {
  winston.cli();
  try {
    winston.remove(winston.transports.Console);
  } catch (ex) {
    console.log('EXCEPTION: Can\'t remove CONSOLE transport on Winston...');
  }
  if (config.logs && config.logs.console) {
    winston.add(winston.transports.Console, {level: config.logs.level, colorize: true});
  }

  winston.info('Winston is now logging.');
  winston.inspect = inspectData;
  return winston;
}

/*
 * @method  inspectData Log an javascript object.
 * @param   {Object}  object  Obecjt to Inspect.
 * @param   {String}  label   Label for data log.
 * @return  null
 */
function inspectData(obj, label) {
  var keys = Object.keys(obj),
      list = inspect(obj);
  
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
}

module.exports = Logger;

