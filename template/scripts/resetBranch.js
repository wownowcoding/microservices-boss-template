const { execSync } = require('child_process')

const styles = {
  bold: ['\x1B[1m', '\x1B[22m'],
  italic: ['\x1B[3m', '\x1B[23m'],
  underline: ['\x1B[4m', '\x1B[24m'],
  inverse: ['\x1B[7m', '\x1B[27m'],
  strikethrough: ['\x1B[9m', '\x1B[29m'],
  white: ['\x1B[37m', '\x1B[39m'],
  grey: ['\x1B[90m', '\x1B[39m'],
  black: ['\x1B[30m', '\x1B[39m'],
  blue: ['\x1B[34m', '\x1B[39m'],
  cyan: ['\x1B[36m', '\x1B[39m'],
  green: ['\x1B[32m', '\x1B[39m'],
  magenta: ['\x1B[35m', '\x1B[39m'],
  red: ['\x1B[31m', '\x1B[39m'],
  yellow: ['\x1B[33m', '\x1b[0m'],
  whiteBG: ['\x1B[47m', '\x1B[49m'],
  greyBG: ['\x1B[49;5;8m', '\x1B[49m'],
  blackBG: ['\x1B[40m', '\x1B[49m'],
  blueBG: ['\x1B[44m', '\x1B[49m'],
  cyanBG: ['\x1B[46m', '\x1B[49m'],
  greenBG: ['\x1B[42m', '\x1B[49m'],
  magentaBG: ['\x1B[45m', '\x1B[49m'],
  redBG: ['\x1B[41m', '\x1B[49m'],
  yellowBG: ['\x1B[43m', '\x1B[49m']
}

const log = {
  bold(msg) {
    console.log(styles.bold.join('%s'), msg)
  },
  info(msg) {
    console.log(styles.magenta.join('%s'), msg)
  },
  error(msg) {
    console.log(styles.red.join('%s'), msg)
  }
}
// 加载参数
const getProcessArgs = () => {
  const args = process.argv.slice(2)
  const result = {}
  args.forEach(arg => {
    if (arg.indexOf('=') !== -1) {
      let [key, value] = arg.split('=')
      result[key] = value
    } else {
      result[arg] = true
    }
  })
  return result
}
const options = getProcessArgs()
const isProd = options['--prod']

// 执行shell
const execShell = (cmd, say = true) => {
  say && log.info("execuing [" + cmd + "] ...")
  let result
  try {
    result = execSync(`${cmd}`, { timeout: 2000 }).toString()
    say && console.log(result)
  } catch (e) {
    log.error(e)
    process.exit(1);
  }
  return result
}

// 检查git树是否干净，干净才允许执行
const checkWorkTreeClean = () => {
  const result = execShell('git status')
  if(result.indexOf('nothing to commit') !== -1 && result.indexOf('working tree clean') !== -1) {
    return true
  }
  return false
}

const isWorkTreeClean = checkWorkTreeClean()

// 切到master，并且拉去origin master到本地
const pullAndcheckoutToMaster = () => {
  execShell('git checkout master')
  execShell('git pull origin master')
}

// 重置指定分支为master
const resetFromMaster = () => {
  const branchName1 = 'sit'
  const branchName2 = 'qa'
  // -d 删除本地分支
  // git push origin --delete branchname
  execShell(`git branch -d ${branchName1}`)
  execShell(`git checkout -b ${branchName1}`)
  execShell(`git reset --hard origin/master`)
  execShell(`git push --set-upstream origin ${branchName1} -f`)

  execShell(`git branch -d ${branchName2}`)
  execShell(`git checkout -b ${branchName2}`)
  execShell(`git reset --hard origin/master`)
  execShell(`git push --set-upstream origin ${branchName2} -f`)
}

// 自动打上最新tag
const hitTag = () => {
  // 获取最新的tag
  // let tag = execShell('git describe --tags')
  let newTag
  if (options.tag) {
    newTag = options.tag
  } else {
    let lastTag = execShell('git describe --tags').split('.').map(v => Number(v.replace('v', '')))
    if (++lastTag[2] >= 10) {
      lastTag[2] = 0
      lastTag[1] = lastTag[1] + 1
    }
    if (lastTag[1] >= 10) {
      lastTag[1] = 0
      lastTag[0] = lastTag[0] + 1
    }
    newTag = 'v' + lastTag.join('.')
  }
  execShell('git checkout master')
  execShell('git pull origin master')
  execShell(`git tag ${newTag} -m '自动TAG'`)
  execShell(`git push origin ${newTag}`)
}

// const currentBranch = execShell('git branch', false).match(/\*\s\w+/)[0].replace(/\*\s/, '')

// 为了避免骚操作，只有加上了--prod才会真的去执行
if (isProd) {
  if (!isWorkTreeClean) {
    log.error("WorkTreeClean: " + checkWorkTreeClean())
    process.exit(1)
  }
  pullAndcheckoutToMaster()
  resetFromMaster()
  hitTag()
}

execShell(`git checkout master`)