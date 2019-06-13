export default (twd) => {
  return {
    twd: !twd ? process.cwd() : twd,
    cwd: process.cwd(),
  };
}
