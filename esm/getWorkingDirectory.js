"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = twd => {
  return {
    twd: !twd ? process.cwd() : twd,
    cwd: process.cwd()
  };
};

exports.default = _default;
module.exports = exports.default;