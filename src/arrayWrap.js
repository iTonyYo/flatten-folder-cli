import isArray from './utilities/isArray';
import isNaN from './utilities/isNaN';
import isNil from './utilities/isNil';

export default (tobe) => {
  let outcome = [];

  if (isArray(tobe)) {
    outcome = tobe;
  }

  if (!isArray(tobe) && !isNaN(tobe) && !isNil(tobe)) {
    outcome = [tobe];
  }

  return outcome;
};
