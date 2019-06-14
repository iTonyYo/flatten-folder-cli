import { readdir } from 'fs';
import { promisify } from 'util';
import path from 'path';
import each from 'async/each';
import deepmerge from 'deepmerge';

import shouldExclude from './shouldExclude';

const pReadir = promisify(readdir);

const dirs = {
  dirs: [],
  add: function(dir) {
    this.dirs.push(dir);
  },
  getAll: function() {
    return this.dirs;
  },
};

const files = {
  files: [],
  add: function(file) {
    this.files.push(file);
  },
  getAll: function() {
    return this.files;
  },
};

async function deepTraversalFolder({from, exclude}) {
  const defaultExclusions = {dir: [], file: []};
  const dxclusions = deepmerge(defaultExclusions, exclude);

  const dirExclusions = getDirExclusionRegExps(dxclusions.dir);
  const fileExclusions = getFileExclusionRegExps(dxclusions.file);

  const root = await pReadir(from, {
    withFileTypes: true,
  });

  await each(root, async (content) => {
    if (content.isDirectory()) {
      if (shouldExclude(content.name, dirExclusions)) {
        return;
      }

      dirs.add(path.join(from, content.name));
      await deepTraversalFolder({
        from: path.join(from, content.name),
        exclude: dxclusions,
      });

      return;
    }

    if (shouldExclude(content.name, fileExclusions)) {
      return;
    }

    files.add(path.join(from, content.name));
    return;
  });

  return {
    files: files.getAll(),
    dirs: dirs.getAll(),
  };
}

function getDirExclusionRegExps(dirExclusions) {
  return dirExclusions.map((pat) => {
    return new RegExp(pat);
  });
}

function getFileExclusionRegExps(fileExclusions) {
  return fileExclusions.map((pat) => {
    return new RegExp(pat);
  });
}

export default deepTraversalFolder;
