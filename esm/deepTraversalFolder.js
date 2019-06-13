"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _util = require("util");

var _path = _interopRequireDefault(require("path"));

var _each = _interopRequireDefault(require("async/each"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pReadir = (0, _util.promisify)(_fs.readdir);
const dirs = {
  dirs: [],
  add: function (dir) {
    this.dirs.push(dir);
  },
  getAll: function () {
    return this.dirs;
  }
};
const files = {
  files: [],
  add: function (file) {
    this.files.push(file);
  },
  getAll: function () {
    return this.files;
  }
};

async function deepTraversalFolder({
  from,
  exclude
}) {
  const defaultExclusions = {
    dir: [],
    file: []
  };
  const dxclusions = (0, _deepmerge.default)(defaultExclusions, exclude);
  const root = await pReadir(from, {
    withFileTypes: true
  });
  await (0, _each.default)(root, async content => {
    if (content.isDirectory()) {
      if (shouldExclude(content.name, dxclusions.dir)) {
        return;
      }

      dirs.add(_path.default.join(from, content.name));
      await deepTraversalFolder({
        from: _path.default.join(from, content.name),
        exclude: dxclusions
      });
      return;
    }

    if (shouldExclude(content.name, dxclusions.file)) {
      return;
    }

    files.add(_path.default.join(from, content.name));
    return;
  });
  return {
    files: files.getAll(),
    dirs: dirs.getAll()
  };
}
/**
 * 假设忽略规则: ['node_modules', '.vscode']
 * `every` 执行结果
 *
 * 针对不需要忽略的文件夹: scripts
 * `every` 执行结果: [true, true] => true
 *
 * 针对需要忽略的文件夹: node_modules
 * `every` 执行结果: [false, true] => false
 *
 * 即：`every` 执行结果为 false 时说明当前项是需
 * 要被忽略的
 */


function shouldExclude(name, regexrs) {
  return !regexrs.every(element => {
    const regex = new RegExp(element);
    return !regex.test(name);
  });
}

var _default = deepTraversalFolder;
exports.default = _default;
module.exports = exports.default;