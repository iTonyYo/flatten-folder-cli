import trash from 'trash';
import { resolveCwd } from './paths';

trash([
  resolveCwd('yarn-error.log'),
  resolveCwd('.nyc_output'),
  resolveCwd('coverage'),
  resolveCwd('report'),
  resolveCwd('licenses-development.csv '),
  resolveCwd('licenses-production.csv'),
]);
