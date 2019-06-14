"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = tobe => {
  let outcome = [];

  if (Array.isArray(tobe)) {
    outcome = tobe;
  }

  if (!Array.isArray(tobe) && !Number.isNaN(tobe) && !(tobe == null)) {
    outcome = [tobe];
  }

  return outcome;
};

exports.default = _default;
module.exports = exports.default;