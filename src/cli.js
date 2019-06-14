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
        --excludeFile, -y, 定义要忽略的文件
        --excludeDir, -z, 定义要忽略的文件夹
        --twd, -d, 可指定工作目录，默认：'process.cwd()'
        --to, -t, 被扁平化文件的存放目录，默认：'process.cwd()'
        --version, -V, 查看版本号
        --help, -h, 查看帮助

      示例
        $ flatten-folder
    `, {
      flags: {
        twd: {
          type: 'string',
          alias: 'd',
        },
        to: {
          type: 'string',
          alias: 't',
        },
        excludeFile: {
          type: 'string',
          alias: 'y',
        },
        excludeDir: {
          type: 'string',
          alias: 'z',
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
    const { to, twd, excludeDir, excludeFile } = flags;

    const workingDir = getWorkingDirectory(twd);

    await flattenFolder({
      from: workingDir.twd,
      to: to ? to : workingDir.twd,
      exclude: {
        dir: arrayWrap(excludeDir),
        file: arrayWrap(excludeFile),
      },
    });
  } catch (error) {
    throw error;
  }
})();
