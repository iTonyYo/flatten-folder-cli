import { assert } from 'chai';
import arrayWrap from './arrayWrap';

setTimeout(() => {
  suite('arrayWrap(obj)', () => {
    test("包装非数组数据", () => {
        assert.deepEqual(arrayWrap('1'), ['1']);
      },
    );

    test("包装数组数据", () => {
        assert.deepEqual(arrayWrap([1]), [1]);
      },
    );

    test("包装 Number 实例", () => {
        assert.deepEqual(arrayWrap(new Number(1)), [new Number(1)]);
      },
    );

    test("包装箭头函数", () => {
      const fn = () => ({});
      assert.deepEqual(
        arrayWrap(fn), [fn]
      );
    });
  });

  run();
}, 0);
