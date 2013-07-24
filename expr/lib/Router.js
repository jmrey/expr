/* jslint node: true */
"use strict";

var resource = require('express-resource');

function Router(expr) {
  this.app = expr.app;
  this.expr = expr;
  expr.boom = 'ok';
}

var router = Router.prototype;

router.autoConnect = function autoConnect() {
  var self = this;

  this.app.all('/:controller', function (req, res) {
    res.send(req.params.controller + ' Controller');
  });
  
  this.app.all('/:controller/:action', function (req, res) {
    res.send(req.params.controller + ' Action: ' + req.params.action);
  });
};

router.connect = function connect(url, params) {
  var self = this
    , fn = self.defaultHandler;

  if ('function' === typeof params) {
    fn = params;
  }

  this.app.all(url, fn);
};

router.resource = function resource(url, params, opts) {
  this.app.resource(url, params, opts);
};

module.exports = function (instance) {
  return new Router(instance);
};