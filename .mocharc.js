// 配置选项参见，https://github.com/mochajs/mocha/blob/master/lib/mocha.js#L64
module.exports = {
  extension: ['js'],
  timeout: 120000,
  ui: 'tdd',
  color: true,
  delay: true,
  fullStackTrace: true,
  checkLeaks: true,
  retries: 2,
};
