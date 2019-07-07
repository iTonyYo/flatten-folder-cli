[![Package Quality](https://npm.packagequality.com/shield/flatten-folder-cli.svg)](https://packagequality.com/#?package=flatten-folder-cli) [![Maintainability](https://api.codeclimate.com/v1/badges/86eb484de22401b5ee1b/maintainability)](https://codeclimate.com/github/iTonyYo/flatten-folder-cli/maintainability) [![dependencies Status](https://david-dm.org/itonyyo/flatten-folder-cli/status.svg)](https://david-dm.org/itonyyo/flatten-folder-cli)

# $ flatten-folder

递归扁平化指定文件夹内所有文件。

![Image of Yaktocat](https://raw.githubusercontent.com/iTonyYo/flatten-folder/master/example.gif)

## 安装

```shell
# 使用 NPM
$ npm i -g flatten-folder-cli

# 使用 Yarn
$ yarn global add flatten-folder-cli
```

## 使用

```
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
```

## 贡献指南

仔细查阅 [CONTRIBUTING.md][贡献指南] 以了解详情。

## 证书

[`flatten-folder-cli`][flatten-folder-cli] 获得了 MIT 许可，仔细查阅 [LICENSE.md][证书] 以了解详情。



[贡献指南]: https://github.com/iTonyYo/flatten-folder-cli/blob/master/CONTRIBUTING.md

[证书]: https://github.com/iTonyYo/flatten-folder-cli/blob/master/LICENSE.md

[flatten-folder-cli]: https://github.com/iTonyYo/flatten-folder-cli
