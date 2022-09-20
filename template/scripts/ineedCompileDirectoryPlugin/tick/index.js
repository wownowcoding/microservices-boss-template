// npm install inquirer@^8.0.0
const inquirer = require('inquirer')
const brand = require('../store/brand')
const takeOut = require('../store/takeOut')
const { exec } = require("child_process")

const menu = [brand, takeOut]

const getTargetArr = function () {
  return new Promise((req, rej) => {
    inquirer.prompt([{
      type: "checkbox",
      name: 'reptile',
      message: '选择需要构建目标?',
      choices: menu.map(lt => lt.name),
    }]).then(answers => {
      req(answers.reptile)
    })
  })
}

const getTargetItem = function (needArr, arrs, cb) {
  const menuName = needArr[0]
  const list = menu.find(mt => mt.name === menuName).list
  inquirer.prompt([{
    type: "checkbox",
    name: 'list',
    message: `选择需要构建 ${menuName} 目录?`,
    choices: list.map(lt => lt.name),
  }]).then(answers => {
    exec(`open clear`)
    list.forEach(lt => {
      if (answers.list.includes(lt.name)) {
        arrs.push(lt)
      }
    })
    needArr.shift()
    if (needArr.length == 0) {
      cb(arrs)
    } else {
      getTargetItem(needArr, arrs, cb)
    }
  })
  if (needArr.length == 0) cb(arrs)
}

const getCompileDirectory = function () {
  return new Promise(async (req, rej) => {
    const needArr = await getTargetArr()
    getTargetItem(needArr, [], req)
  })
}

module.exports = {
  getCompileDirectory
}

