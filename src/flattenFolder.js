import { basename, join } from 'path';
import each from 'async/each';
import moveFile from 'move-file';
import trash from 'trash';

import deepTraversalFolder from './deepTraversalFolder';

async function main({from = './', to = './', exclude}) {
  const { files, dirs } = await deepTraversalFolder({
    from,
    exclude: getExclusions(exclude),
  });

  // await mv(files, to);
  // await del(dirs);

  return { files, dirs };
}

function getExclusions(iptExclude) {
  return {
    dir: Array.isArray(iptExclude.dir) ? iptExclude.dir : [],
    file: Array.isArray(iptExclude.file) ? iptExclude.file : [],
  };
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
