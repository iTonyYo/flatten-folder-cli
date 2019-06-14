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

var _shouldExclude = _interopRequireDefault(require("./shouldExclude"));

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
  const dirExclusions = getDirExclusionRegExps(dxclusions.dir);
  const fileExclusions = getFileExclusionRegExps(dxclusions.file);
  const root = await pReadir(from, {
    withFileTypes: true
  });
  await (0, _each.default)(root, async content => {
    if (content.isDirectory()) {
      if ((0, _shouldExclude.default)(content.name, dirExclusions)) {
        return;
      }

      dirs.add(_path.default.join(from, content.name));
      await deepTraversalFolder({
        from: _path.default.join(from, content.name),
        exclude: dxclusions
      });
      return;
    }

    if ((0, _shouldExclude.default)(content.name, fileExclusions)) {
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

function getDirExclusionRegExps(dirExclusions) {
  return dirExclusions.map(pat => {
    return new RegExp(pat);
  });
}

function getFileExclusionRegExps(fileExclusions) {
  return fileExclusions.map(pat => {
    return new RegExp(pat);
  });
}

var _default = deepTraversalFolder;
exports.default = _default;
module.exports = exports.default;