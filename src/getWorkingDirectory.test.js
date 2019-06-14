import { assert } from 'chai';
import getWorkingDirectory from './getWorkingDirectory';

setTimeout(() => {
  suite('getWorkingDirectory(twd)', () => {
    test("未手动提供目标工作目录", () => {
        const { twd } = getWorkingDirectory();
        assert.deepEqual(twd, process.cwd());
      },
    );

    test("提供目标工作目录", () => {
        const { twd } = getWorkingDirectory('/Users/iyowei');
        assert.deepEqual(twd, '/Users/iyowei');
      },
    );
  });

  run();
}, 0);
