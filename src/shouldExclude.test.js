import { assert } from 'chai';
import shouldExclude from './shouldExclude';

setTimeout(() => {
  suite('shouldExclude(name, regexrs)', () => {
    test("提供不会被忽略的元素", () => {
      const name = 'scripts';
      const regexrs = [
        new RegExp('node_modules'),
        new RegExp('.vscode'),
      ];

      assert.isFalse(shouldExclude(name, regexrs));
    });

    test("提供会被忽略的元素", () => {
      const name = 'node_modules';
      const regexrs = [
        new RegExp('node_modules'),
        new RegExp('.vscode'),
      ];

      assert.isTrue(shouldExclude(name, regexrs));
    });
  });

  run();
}, 0);
