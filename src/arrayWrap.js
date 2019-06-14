export default (tobe) => {
  let outcome = [];

  if (Array.isArray(tobe)) {
    outcome = tobe;
  }

  if (!Array.isArray(tobe) && !Number.isNaN(tobe) && !(tobe == null)) {
    outcome = [tobe];
  }

  return outcome;
};
