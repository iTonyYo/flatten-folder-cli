const fg = require('fast-glob');

const deepTraversalFolderOutputArray =
  require('../esm/deepTraversalFolder');

const deepTraversalFolderOutputSet =
  require('./deepTraversalFolder.Set');

const deepTraversalFolderOutputYallist
  = require('./deepTraversalFolder.Yallist');

(async () => {
  console.time('fast-glob');
  await fg(['**/**'], {
    dot: true,
    ignore: ['node_modules', '.git', '.vscode', 'esm'],
    absolute: true,
    onlyDirectories: true,
  })
  console.timeEnd('fast-glob');
})();

(async () => {
  console.time('deepTraversalFolderOutputArray');
  await deepTraversalFolderOutputArray({
    from: './',
    exclude: {
      dir: ['node_modules', '.git', '.vscode', 'esm'],
    },
  });
  console.timeEnd('deepTraversalFolderOutputArray');
})();

(async () => {
  console.time('deepTraversalFolderOutputSet');
  await deepTraversalFolderOutputSet({
    from: './',
    exclude: {
      dir: ['node_modules', '.git', '.vscode', 'esm'],
    },
  });
  console.timeEnd('deepTraversalFolderOutputSet');
})();

(async () => {
  console.time('deepTraversalFolderOutputYallist');
  await deepTraversalFolderOutputYallist({
    from: './',
    exclude: {
      dir: ['node_modules', '.git', '.vscode', 'esm'],
    },
  });
  console.timeEnd('deepTraversalFolderOutputYallist');
})();
