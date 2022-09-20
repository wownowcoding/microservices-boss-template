//  执行命令的方法
const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const filterBranch = ['master', 'sit', 'uat', 'fat', 'pre', 'pro', 'prod', 'back'];
const likeFilterBranch = ['release'];

//  项目路径
const proPath = path.join(__dirname, '../../../');
if (!fs.existsSync(proPath)) {
  exitSay('路径不存在');
}
//  获取命令返回的结果
const getShellResult = (str) => execSync(`cd ${proPath} && ${str}`, {timeout: 10000}).toString();

//  获取本地分支信息
const getCurrentBranch = () => getShellResult(`git branch`).replace(/ /g, '').split('\n').filter(item => item.includes('*')).toString().replace(/\*/g, '');

const currentBranch = getCurrentBranch();

//  检查绝对匹配的分支名
if (filterBranch.indexOf(currentBranch.toLocaleLowerCase()) !== -1) {
  process.exit(0);
}
//  检查模糊匹配的分支名
for (const likeName of likeFilterBranch) {
  const brName = currentBranch.toLocaleLowerCase();
  if (likeName.indexOf(brName) !== -1) {
    if (brName === 'release' && brName.indexOf('/') !== -1) {
      throw '“Release” 分支名不允许包含 “/” 斜杠，请替换成 “-”("Release" branch name is not allowed to contain "/" slashes, please replace with "-")';
    }
    process.exit(0);
  }
}

const branchNamePix = ['feature', 'fix', 'hotfix', 'chore', 'doc'];
const errorList = [];
let one, featureName;
if (/[A-Z]/.test(currentBranch)) {
  errorList.push('所有字母必须小写(all letters lowercase)');
}
if (currentBranch.indexOf('/') === -1) {
  errorList.push('请使用 “/” 隔开分支声明、功能特性(Please use “/” to separate branch declarations, features)');
} else {
  const branchNames = currentBranch.split('/');
  if (branchNames.length > 2) {
    errorList.push('分支名只能包含一个斜杠 “/”(Branch names can only contain one slash "/")');
  } else {
    one = branchNames[0];
    if (branchNames[1]) {
      featureName = branchNames[1] || '';
    } else {
      errorList.push('功能特性说明不能为空，必须同时包含英文以及中文说明，并且使用横杠隔开(Feature descriptions cannot be empty, must contain both English and Chinese descriptions, and are separated by horizontal bars)');
    }
  }
}

if (one && featureName) {
  if (branchNamePix.indexOf(one) === -1) {
    errorList.push(`分支名首个单词只能是(${branchNamePix.join(', ')})任意一个(The first word of the branch name can only be any one of (${branchNamePix.join(', ')}))`);
  } else {
    if (!(/[a-z]/.test(featureName))) {
      errorList.push('功能特性说明必须包含英文说明(Feature descriptions must contain English descriptions)');
    }
    //cmx 2022-8-18 annotate this rules
    /*if (!(/.*[\u4e00-\u9fa5]+.*$/.test(featureName))) {
      errorList.push('功能特性说明必须包含中文说明(Feature description must include Chinese description)');
    }*/
  }
}

if (errorList && errorList.length) {
  console.log('\n\n\n')
  errorList.forEach((e, i) => {
    console.log(`\u001b[38;5;166m${i + 1}: `, e);
  });
  throw `\u001b[38;5;166m
    
    Demo: feature/xxx-xxx-xxx-开发某某某功能
    Demo: chore/xxx-xxx-xxx-优化某某某功能
    Demo: fix/xxx-xxx-xxx-修复某某某功能
    Demo: hotfix/xxx-xxx-xxx-修复某某某功能
    Demo: doc/xxx-xxx-xxx-某模块添加文档
    xxx 为单词简要说明，尽量简短明了!
    \u001b[39;49m`
}
