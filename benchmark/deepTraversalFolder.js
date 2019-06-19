const Benchmark = require('benchmark');
const fg = require('fast-glob');
const deepTraversalFolder = require('../esm/deepTraversalFolder');

const suite = new Benchmark.Suite;

suite
  .add('fast-glob', async function() {
    await fg(['**/**'], {
      dot: true,
      ignore: ['node_modules', '.git', '.vscode', 'esm'],
      absolute: true,
    });

    return;
  })
  .add('deepTraversalFolder()', async function() {
    await deepTraversalFolder({
      from: './',
      exclude: {
        dir: ['node_modules', '.git', '.vscode', 'esm'],
      },
    });

    return;
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log(`\n结果: \n\`${this.filter('fastest').map('name')}\` 最快!`);
  })
  .run({ 'async': true });
