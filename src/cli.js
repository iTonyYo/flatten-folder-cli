#!/usr/bin/env node

import meow from 'meow';
import arrify from 'arrify';
import chalk from 'chalk';
import redent from 'redent';
import gradient from 'gradient-string';
import updateNotifier from 'update-notifier';

import getWorkingDirectory from './getWorkingDirectory';
import flattenFolder from './flattenFolder';

(async () => {
  try {
    const cli = meow(`
      使用方式
        $ flatten-folder 选项 [...]

      选项
        --excludeFile, -y,                   定义要忽略的文件
        --excludeDir, -z,                    定义要忽略的文件夹
        --twd, -d,                           可指定工作目录，默认：'process.cwd()'
        --to, -t,                            被扁平化文件的存放目录，默认：'process.cwd()'
        --version, -V,                       查看版本号
        --help, -h,                          查看帮助

      示例
        $ flatten-folder                     扁平当前文件夹
        $ flatten-folder -d /usr -t /usr     扁平 \`/usr\` 文件夹
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

    const {files, dirs } = await flattenFolder({
      from: workingDir.twd,
      to: to ? to : workingDir.twd,
      exclude: {
        dir: arrify(excludeDir),
        file: arrify(excludeFile),
      },
    });

    console.log(redent(chalk `
      {greenBright.bold ${gradient.rainbow('操作成功!')}}
      共有 {bold ${files.length}} 个文件被移动，删除了 {bold ${dirs.length}} 个文件夹。

      {grey 工作目录：}
      {grey ${workingDir.twd}}

      {grey 将所有文件扁平转移至：}
      {grey ${to ? to : workingDir.twd}}
    `));
  } catch (error) {
    throw error;
  }
})();
