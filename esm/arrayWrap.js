"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isArray = _interopRequireDefault(require("./utilities/isArray"));

var _isNaN = _interopRequireDefault(require("./utilities/isNaN"));

var _isNil = _interopRequireDefault(require("./utilities/isNil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = tobe => {
  let outcome = [];

  if ((0, _isArray.default)(tobe)) {
    outcome = tobe;
  }

  if (!(0, _isArray.default)(tobe) && !(0, _isNaN.default)(tobe) && !(0, _isNil.default)(tobe)) {
    outcome = [tobe];
  }

  return outcome;
};

exports.default = _default;
module.exports = exports.default;