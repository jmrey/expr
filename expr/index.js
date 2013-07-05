/* jslint node: true */
"use strict";

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var expr = {
  paths: (function () {
    var applicationPath = path.dirname(module.parent.filename)
      , publicPath = path.join(path.dirname(applicationPath), 'public');

    return {
      app: applicationPath,
      public: publicPath,
      models: path.join(applicationPath, 'models'),
      controllers: path.join(applicationPath, 'controllers'),
      views: path.join(applicationPath, 'views'),
      lib: path.join(__dirname, 'lib'),
      base: path.join(__dirname, 'base')
    };
  })(),
  init: function () {
    loadConfiguration();
    configureApp();
  },
  run: function () {
    //if (!this.initialized) {
      this.init();
    //}

    var app = this.app
      , port = app.get('port');

    this.server.listen(port, function () {
      console.log('Success');
    });
  }
};

function loadConfiguration() {
  var configFile = path.join(expr.paths.app, 'config', 'index.js');

  if (fs.existsSync(configFile)) {
    var config = require(configFile)
      , env = process.env.NODE_ENV || 'dev';

    expr.env = env;
    expr.config = config[env];

    console.log('Config has been loaded successfully.');
  } else {
    console.log('Config file is required');
  }
}

function configureApp() {
  var app = express();

  app.set('env', expr.env);
  app.set('port', expr.config.port);
  app.set('views', expr.paths.views);
  app.set('view engine', 'jade');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(expr.paths.public));

  expr.app = app;
  expr.server = http.createServer(app);
  expr.logger = expr.lib.Logger(expr.config);
}

expr.lib = require('./lib');
//expr.base = require('./base');

module.exports = expr;


