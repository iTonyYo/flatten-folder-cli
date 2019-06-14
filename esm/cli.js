#!/usr/bin/env node
"use strict";

var _meow = _interopRequireDefault(require("meow"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _getWorkingDirectory = _interopRequireDefault(require("./getWorkingDirectory"));

var _flattenFolder = _interopRequireDefault(require("./flattenFolder"));

var _arrayWrap = _interopRequireDefault(require("./arrayWrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    const cli = (0, _meow.default)(`
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
          alias: 'xf'
        },
        excludeDir: {
          type: 'string',
          alias: 'xd'
        },
        twd: {
          type: 'string',
          alias: 'd'
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
      twd,
      excludeDir,
      excludeFile
    } = flags;
    const workingDir = (0, _getWorkingDirectory.default)(twd);
    await (0, _flattenFolder.default)({
      from: workingDir.twd,
      to: workingDir.twd,
      exclude: {
        dir: (0, _arrayWrap.default)(excludeDir),
        file: (0, _arrayWrap.default)(excludeFile)
      }
    });
  } catch (error) {
    throw error;
  }
})();