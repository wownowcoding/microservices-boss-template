const fs = require('fs');
const package = require('./package.json');

module.exports = (api, options, rootOptions) => {


  api.extendPackage({ remoteName: options.projectName });
  // 命令
  api.extendPackage({ scripts: package.scripts });

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: package.dependencies,
    devDependencies: package.devDependencies
  });

  api.extendPackage({
    "pre-commit": ["check-branch"],
    "browserslist": [
      "> 1%",
      "last 2 versions",
      "not ie <= 11"
    ]
  });


  api.render('../template');
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
  });
};