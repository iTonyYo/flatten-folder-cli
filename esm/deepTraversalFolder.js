"use strict";

const {
  readdir
} = require('fs');

const {
  promisify
} = require('util');

const path = require('path');

const eachLimit = require('async/eachLimit');

const merge = require('./utilities/merge');

const shouldExclude = require('./shouldExclude');

const pReadir = promisify(readdir);
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

async function main({
  from,
  exclude
}) {
  await traversalFolder({
    from,
    exclude: getExclusions(exclude)
  });
  return {
    files: files.getAll(),
    dirs: dirs.getAll()
  };
}

function getExclusions(iptExclude) {
  const _default = {
    dir: [],
    file: []
  };
  const nativeExclusions = merge(_default, iptExclude);
  return {
    dir: getDirExclusionRegExps(nativeExclusions.dir),
    file: getFileExclusionRegExps(nativeExclusions.file)
  };
}

async function traversalFolder({
  from,
  exclude
}) {
  const root = await pReadir(from, {
    withFileTypes: true
  });
  await eachLimit(root, 8, async content => {
    if (content.isDirectory()) {
      if (shouldExclude(content.name, exclude.dir)) {
        return;
      }

      dirs.add(path.join(from, content.name));
      await traversalFolder({
        from: path.join(from, content.name),
        exclude
      });
      return;
    }

    if (shouldExclude(content.name, exclude.file)) {
      return;
    }

    files.add(path.join(from, content.name));
    return;
  });
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

module.exports = main;