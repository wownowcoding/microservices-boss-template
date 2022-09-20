const execSyncBase = require('child_process').execSync;
const { dependencies, devDependencies } = require('./package.json');
Promise.all(Object.keys(Object.assign({}, dependencies, devDependencies)).sort((a,b) => a.localeCompare(b)).map(e => {
  const version = (dependencies[e] || devDependencies[e]).replace(/\^|\~/g, '');
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      const versions = JSON.parse(execSyncBase(`npm view ${e} versions`).toString().replace(/[\n\s]+/g, '').replace(/\'/g, '"'));
      resolve({
        name: e,
        currentVersion: version,
        versions: versions[versions.length - 1]
      });
    });
  })
  // const versions = execSyncBase(`npm view ${e} versions`);
})).then(allDependencies => {
  console.log('allDependencies: ', allDependencies)
});