#!/usr/bin/env node

import meow from 'meow';
import updateNotifier from 'update-notifier';

import getWorkingDirectory from './getWorkingDirectory';
import flattenFolder from './flattenFolder';
import arrayWrap from './arrayWrap';

(async () => {
  try {
    const cli = meow(`
      使用方式
        $ flatten-folder 选项 [...]

      选项
        --excludeFile, -xf, 定义要忽略的文件
        --excludeDir, -xd, 定义要忽略的文件夹
        --twd, -d, 目标目录，默认：'process.cwd()'
        --version, -V, 查看版本号
        --help, -h, 查看帮助

      示例
        $ flatten-folder
    `, {
      flags: {
        excludeFile: {
          type: 'string',
          alias: 'xf',
        },
        excludeDir: {
          type: 'string',
          alias: 'xd',
        },
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
    const { twd, excludeDir, excludeFile } = flags;

    const workingDir = getWorkingDirectory(twd);

    await flattenFolder({
      from: workingDir.twd,
      to: workingDir.twd,
      exclude: {
        dir: arrayWrap(excludeDir),
        file: arrayWrap(excludeFile),
      },
    });
  } catch (error) {
    throw error;
  }
})();
