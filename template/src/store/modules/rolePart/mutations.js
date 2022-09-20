/*
 * @Description:
 * @Author: 黄博方
 * @Date: 2019-08-08 13:57:02
 * @LastEditors: 黄博方
 * @LastEditTime: 2019-09-03 17:26:38
 */
import consts from './consts'
import { getExistingRouter, filterRoutersByCode } from '@/router/routerUtils'
// import mainAuthRouter from '@/router/auth'

export default {
    // 把角色权限写入state
    [consts.GET_ROLE_PART] (state, payload) {
        let rolePart = {}
        let roleName = {}
        let pagePermissions = {}

        // 递归遍历权限树,输出rolePart字典,用于校验权限码
        const setRolePartMap = list => {
            list.forEach(item => {
                let key = item.code && item.code.replace(/\s/g, '').replace(/:/g, '_') //追加过滤掉空格
                // 功能权限按钮
                if (item.resType.code === 12 && item.own) {
                    let parentKey = item.parent && item.parent.replace(/\s/g, '').replace(/:/g, '_') //追加过滤掉空格
                    if (!pagePermissions[parentKey])
                        pagePermissions[parentKey] = {}
                    pagePermissions[parentKey][key] = item
                }
                // 功能权限
                rolePart[key] = !!item.own
                roleName[key] = item.name
                if (!!item.children && item.children.length) {
                    setRolePartMap(item.children)
                }
            })
        }
        setRolePartMap(payload)

        state.rolePart = rolePart
        state.rolePagePermissions = pagePermissions
        state.roleName = roleName
        // state.permissionList = filterRoutersByCode(payload, mainAuthRouter)
        state.permissionList = filterRoutersByCode(payload, [])
    },
}
