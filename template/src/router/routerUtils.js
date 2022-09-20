/**
 * @description 自动根据当前环境切换引入模块方式
 */
export const _import = process.env.NODE_ENV === 'development' ? filePath => { 
        try {
            return require(`@/page/${filePath}.vue`).default 
        } catch (e) {
            console.log(e)
        }
        return null
    }  
    : filePath => resolve => import(`@/page/${filePath}.vue`).then(resolve);
/**
 * @description 根据功能路由配置自动转换成vue-router识别的路由配置
 * @param {Object} routerCfg 功能路由配置,详情参考功能目录下的routerCfg文件中的每一项export
 */
// TODO 以下功能还未实现
export const getRouterFromRouterCfg = routerCfg => {
    // TODO 一级菜单配置实现
    // 二级菜单
    const subMenuRouter = {
        path: routerCfg.path, // 路由url
        title: routerCfg.title,
        code: routerCfg.code, // 权限标识
        name: routerCfg.code, // 路由标识跟着权限标识走
        path: _import(routerCfg.componentPath),
        icon: routerCfg.icon,
    }
    // 遍历子路由
    const childrenRouterList = routerCfg.children.map(item => {
        return {
            path: item.path,
            title: item.title,
            code: item.code || routerCfg.code, // 优先匹配子路由的code,没有则跟着父路由权限走
            code: item.code || item.code + item.path, // 优先匹配子路由的code,没有则跟着父路由权限走
            path: _import(item.componentPath),
        }
    })
    return {
        subMenuRouter,
        childrenRouterList,
    }
}

/**
 * @description 根据传入的路由code判断获取该路由配置(main页面嵌套)
 * @param menuCode {String} 菜单权限码
 * @param menuRouterCfg {Array} 路由配置集合
 */
export const getExistingRouter = (menuCode, menuRouterCfg) => {
    let matchItem = null
    for (let i = 0; i < menuRouterCfg.length; i++) {
        const item = menuRouterCfg[i]
        // 这里备注一下,menuRouteCfg中的菜单项,以name作为唯一标识(原来为code)
        if (menuCode == item.name) {
            matchItem = item
            break
        }
    }
    return matchItem
}

/**
 * @desc 过滤掉在路由表没有对应权限code的路由
 * @param routerList 被过滤的路由表
 * @param routerConfig 参照的路由表
 * @returns {Array}
 */
export const filterRoutersByCode = (routerList, routerConfig) => {
    return routerList && routerList.filter(item => {
        const code = item.code || item.menuCode
        item.routerCfg = getExistingRouter(code, routerConfig)
        return !!item.routerCfg
    })
}
