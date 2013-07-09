/* jslint node: true */
/* global describe:true, it:true */
"use strict";

var assert = require('chai').assert
  , expr = require('./example/app');

describe('Expr.paths', function () {
  it('should has paths', function () {
    assert.property(expr, 'paths', 'has paths property.');
    console.log(expr.paths);
  });
});