const path = require('path')
const fs = require('fs')
const { getCompileDirectory } = require('./tick/index')

const configPath = path.join(__dirname, '../ignore-plugin-config.json')

getCompileDirectory().then(res => {
  const routes = []
  const pages = []
  for (let i = 0; i < res.length; i++) {
    const item = res[i]
    routes.push(item.route)
    pages.push(item.page)
  }
  const configJson = {
    desc: [
      "1. buildAll: 构建全部",
      "2. routes: 需要构建的路由",
      "3. pages: 需要构建的页面",
      "4. remarks: 因为项目结构原因，不能清晰找出页面绑定的路由关系，所以只能通过page + route的方式控制构建"
    ],
    buildAll: false,
    buildRoutes: routes,
    buildPages: pages
  }
  fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2), 'utf-8')
  console.log('=========  初始化按需加载的配置 ============')
  console.log('请输入 npm run dev-part')
})
