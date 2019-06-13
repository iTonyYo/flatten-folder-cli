#!/usr/bin/env node
"use strict";

var _meow = _interopRequireDefault(require("meow"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _getWorkingDirectory = _interopRequireDefault(require("./getWorkingDirectory"));

var _flattenFolder = _interopRequireDefault(require("./flattenFolder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    const cli = (0, _meow.default)(`
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
      twd
    } = flags;
    const workingDir = (0, _getWorkingDirectory.default)(twd);
    await (0, _flattenFolder.default)({
      from: workingDir.twd,
      to: workingDir.twd
    });
  } catch (error) {
    throw error;
  }
})();