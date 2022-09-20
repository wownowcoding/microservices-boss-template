const fs = require('fs');
const package = require('./package.json');

module.exports = (api, options, rootOptions) => {
  api.extendPackage({ remoteName: options.projectName });
  // 命令
  api.extendPackage(package);

  api.render('../template');
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
  });
};