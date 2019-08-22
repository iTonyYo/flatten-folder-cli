import { resolve, join, dirname } from 'path';
import { realpathSync } from 'fs';
import pMap from 'p-map';
import fg from 'fast-glob';
import execa from 'execa';
import chalk from 'chalk';

import { resolveCwd } from './paths';

async function build(src) {
  await execa(
    'npx',
    [
      'babel',
      '-d',
      getDestPath(src),
      resolveCwd(src),
    ]
  );
}

function getDestPath(path) {
  return dirname(
    join(
      resolveCwd('esm'),
      path.substring('src/'.length, path.length),
    )
  );
}

async function getSrcs() {
  const srcs = await fg([
    'src/**/*.js',
    '!src/**/(*.)+(benchmark|test).js',
  ]);

  return srcs;
}

(async () => {
  try {
    await pMap(await getSrcs(), async (src) => {
      await build(src);
      return;
    }, { concurrency: 8 });

    await execa('chmod', ['+x', resolveCwd('esm/cli.js')]);

    console.log(chalk `{greenBright 构建成功!}`);
  } catch (err) {
    throw(err);
  }
})();
