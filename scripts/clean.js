import execa from 'execa';
import { resolveCwd } from './paths';

(async () => {
  const scriptsDir = resolveCwd('scripts');

  const cleanReports = execa('npx', [
    'babel-node',
    `${scriptsDir}/clean-reports.js`,
  ]);

  const cleanCache = execa('npx', [
    'babel-node',
    `${scriptsDir}/clean-cache.js`,
  ]);

  await cleanReports;
  await cleanCache;
})();
