const {
  Worker, isMainThread, parentPort
} = require('worker_threads');

if (isMainThread) {
  module.exports = () => new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {});
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
} else {
  const path = require('path');
  const fs = require('fs');
  const execSyncBase = require('child_process').execSync;
  const files = fs.readdirSync(path.join(__dirname, '../../node_modules')).filter(e => e.indexOf('pre-commit') !== -1);
  if (!files.length) {
    try {
      execSyncBase('npm i');
    } catch (err) {}
  }
  parentPort.postMessage('success');
  setTimeout(() => {
    process.exit(0);
  }, 50);
}