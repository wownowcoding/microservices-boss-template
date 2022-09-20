module.exports = [
  {
    type: 'input',
    name: 'projectName',
    message: '请输入符合 js 变量命名规范的项目名称：',
    validate: projectName => /^([^\x00-\xff]|[a-zA-Z_$])([^\x00-\xff]|[a-zA-Z0-9_$])*$/.test(projectName),
  }
]