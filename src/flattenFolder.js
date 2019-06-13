import { basename, join } from 'path';
import each from 'async/each';
import moveFile from 'move-file';
import trash from 'trash';

import deepTraversalFolder from './deepTraversalFolder';

// 待办： 重命名函数名
async function main({from, to}) {
  const { files, dirs } = await deepTraversalFolder({
    from,
    exclude: {
      dir: ['node_modules', '.vscode', 'doc', 'to', 'scripts'],
      file: [],
    },
  });

  await mv(files, to);
  await del(dirs);
}

async function mv(files, to) {
  await each(files, async (file) => {
    await moveFile(file, join(to, basename(file)));
    return;
  });
}

async function del(dirs) {
  await trash(dirs);
}

export default main;
