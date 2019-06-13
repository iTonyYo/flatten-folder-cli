import { readdir } from 'fs';
import { promisify } from 'util';
import path from 'path';
import each from 'async/each';
import deepmerge from 'deepmerge';

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

  const root = await pReadir(from, {
    withFileTypes: true,
  });

  await each(root, async (content) => {
    if (content.isDirectory()) {
      if (shouldExclude(content.name, dxclusions.dir)) {
        return;
      }

      dirs.add(path.join(from, content.name));
      await deepTraversalFolder({
        from: path.join(from, content.name),
        exclude: dxclusions,
      });

      return;
    }

    if (shouldExclude(content.name, dxclusions.file)) {
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
  return !regexrs.every((element) => {
    const regex = new RegExp(element);
    return !regex.test(name);
  });
}

export default deepTraversalFolder;
