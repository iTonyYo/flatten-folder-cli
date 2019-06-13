#!/usr/bin/env node

import meow from 'meow';
import updateNotifier from 'update-notifier';

import getWorkingDirectory from './getWorkingDirectory';
import flattenFolder from './flattenFolder';

(async () => {
  try {
    const cli = meow(`
      使用方式
        $ flattenFolder 选项 [...]

      选项
        --twd, -d, 目标目录，默认：'process.cwd()'
        --version, -V, 查看版本号

      示例
        $ flattenFolder
    `, {
      flags: {
        twd: {
          type: 'string',
          alias: 'd',
        },
        help: {
          type: 'boolean',
          alias: 'h',
        },
        version: {
          type: 'boolean',
          alias: 'V',
        },
      },
    });

    updateNotifier({ pkg: cli.pkg }).notify();

    const { flags } = cli;
    const { twd } = flags;

    const workingDir = getWorkingDirectory(twd);

    await flattenFolder({
      from: workingDir.twd,
      to: workingDir.twd,
    });
  } catch (error) {
    throw error;
  }
})();
