const fs = require('fs');
const path = require('path');
const deleteList = ['alinode', 'egg-agent', 'egg-web', 'common-error', 'egg-schedule'];
const execSync = require('child_process').execSync;
module.exports = agent => {
  agent.messenger.on('clear-logs', () => {
    try {
      const logPath = agent.config.logger.dir;
      let logFilePath = fs.existsSync(logPath) && logPath ||
        fs.existsSync(path.join(agent.config.baseDir, logPath)) && path.join(agent.config.baseDir, logPath) ||
        fs.existsSync(path.join(path.join(__dirname, '../'), logPath)) && path.join(path.join(__dirname, '../'), logPath) || '';
      if (logFilePath) {
        const files = fs.readdirSync(logFilePath);
        for (const file of files) {
          for (const deleteFileName of deleteList) {
            if (file.indexOf(deleteFileName) !== -1) {
              const logfilePath = path.join(logPath, file);
              fs.existsSync(logfilePath) && execSync(`rm -rf ${logfilePath}`);
            }
          }
        }
      }
    } catch(err) {}
  });
};