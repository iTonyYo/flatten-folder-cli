"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _each = _interopRequireDefault(require("async/each"));

var _moveFile = _interopRequireDefault(require("move-file"));

var _trash = _interopRequireDefault(require("trash"));

var _deepTraversalFolder = _interopRequireDefault(require("./deepTraversalFolder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function main({
  from = './',
  to = './',
  exclude
}) {
  const {
    files,
    dirs
  } = await (0, _deepTraversalFolder.default)({
    from,
    exclude: getExclusions(exclude)
  });
  await mv(files, to);
  await del(dirs);
}

function getExclusions(iptExclude) {
  return {
    dir: Array.isArray(iptExclude.dir) ? iptExclude.dir : [],
    file: Array.isArray(iptExclude.file) ? iptExclude.file : []
  };
}

async function mv(files, to) {
  await (0, _each.default)(files, async file => {
    await (0, _moveFile.default)(file, (0, _path.join)(to, (0, _path.basename)(file)));
    return;
  });
}

async function del(dirs) {
  await (0, _trash.default)(dirs);
}

var _default = main;
exports.default = _default;
module.exports = exports.default;