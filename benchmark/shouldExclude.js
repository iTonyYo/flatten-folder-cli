import Benchmark from 'benchmark';

const suite = new Benchmark.Suite;
const regexrs = [
  new RegExp('node_modules'),
  new RegExp('scripts'),
  new RegExp('.vscode'),
  new RegExp('src'),
  new RegExp('docs'),
  new RegExp('test'),
  new RegExp('.git'),
  new RegExp('video'),
  new RegExp('coverage'),
  new RegExp('certs'),
  new RegExp('public'),
];

function everyImpl(name, regexrs) {
  return !regexrs.every((RegExp) => {
    return !RegExp.test(name);
  });
}

function someImpl(name, regexrs) {
  return regexrs.some((RegExp) => {
    return RegExp.test(name);
  });
}

suite
  .add('everyImpl(name, regexrs)', function() {
    everyImpl('scripts', regexrs);
  })
  .add('someImpl(name, regexrs)', function() {
    someImpl('scripts', regexrs);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log(`\n结果: \n\`${this.filter('fastest').map('name')}\` 最快!`);
  })
  .run({ 'async': true });
