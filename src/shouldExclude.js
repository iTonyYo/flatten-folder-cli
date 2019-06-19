/**
 * 通过 "array.some()" 实现：既定一组规则，用它们
 * 检测一个字符串，只要该字符串符合规则之一，就不再用
 * 另外一个规则检测当前元素。
 *
 * 通过 "array.every()" 实现：既定一组规则，用它
 * 们逐个检测一个字符串，最终每个规则对应的检测结果都
 * 通过，则返回 true；反之只要检测结果中存在一个
 * false，则返回 false。
 *
 * 浏览器中性能测试，
 * https://jsperf.com/array-some-vs-array-every
 *
 * Node 下性能测试，
 * ./shouldExclude.benchmark.js
 *
 * 附：
 *
 * 以下是 "array.every()" 实现细节，
 *
 * 假设忽略规则: ['node_modules', '.vscode']
 *
 * 针对不需要忽略的文件夹: scripts
 * `every` 执行结果: [true, true] => true
 *
 * 针对需要忽略的文件夹: node_modules
 * `every` 执行结果: [false, true] => false
 *
 * 即：`every` 执行结果为 false 时说明当前项是需
 * 要被忽略的
 */

function everyImpl(name, regexrs) {
  return !regexrs.every((RegExp) => {
    return !RegExp.test(name);
  });
}

module.exports = everyImpl;
