#!/usr/bin/env node
"use strict";

var _meow = _interopRequireDefault(require("meow"));

var _arrify = _interopRequireDefault(require("arrify"));

var _chalk = _interopRequireDefault(require("chalk"));

var _redent = _interopRequireDefault(require("redent"));

var _gradientString = _interopRequireDefault(require("gradient-string"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _getWorkingDirectory = _interopRequireDefault(require("./getWorkingDirectory"));

var _flattenFolder = _interopRequireDefault(require("./flattenFolder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    const cli = (0, _meow.default)(`
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
          alias: 'd'
        },
        to: {
          type: 'string',
          alias: 't'
        },
        excludeFile: {
          type: 'string',
          alias: 'y'
        },
        excludeDir: {
          type: 'string',
          alias: 'z'
        },
        help: {
          type: 'boolean',
          alias: 'h'
        },
        version: {
          type: 'boolean',
          alias: 'V'
        }
      }
    });
    (0, _updateNotifier.default)({
      pkg: cli.pkg
    }).notify();
    const {
      flags
    } = cli;
    const {
      to,
      twd,
      excludeDir,
      excludeFile
    } = flags;
    const workingDir = (0, _getWorkingDirectory.default)(twd);
    const {
      files,
      dirs
    } = await (0, _flattenFolder.default)({
      from: workingDir.twd,
      to: to ? to : workingDir.twd,
      exclude: {
        dir: (0, _arrify.default)(excludeDir),
        file: (0, _arrify.default)(excludeFile)
      }
    });
    console.log((0, _redent.default)(_chalk.default`
      {greenBright.bold ${_gradientString.default.rainbow('操作成功!')}}
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