/*
 * @Description: 系统管理相关API
 * @Author: 管铭钊
 * @Date: 2019/7/2
 */
import config from '@/config';

const { INTERNATIONAL_WEB, BOSS_WEB } = config.moduleUrl

const getFullUrl = (url) => `${INTERNATIONAL_WEB}${url}`
const getBossWebFullUrl = (url) => `${BOSS_WEB}${url}`

/**
 * 国际化管理
 */
export const international_list = getFullUrl('/config/list')
export const international_edit = getFullUrl('/config/update')
export const international_import = getFullUrl('/config/retcode/upload_jar')
export const international_import_excel = getFullUrl('/config/import')
export const international_export = getFullUrl('/config/export')

/**
 * 菜单管理
 */
export const editMenu = getBossWebFullUrl('/boss/system/menu/edit.do')
export const addMenu = getBossWebFullUrl('/boss/system/menu/create.do')
export const sortMenu = getBossWebFullUrl('/boss/system/menu/list/sort.do')
export const deleteMenu = getBossWebFullUrl('/boss/system/menu/delete.do')
export const getRouterPath = getBossWebFullUrl('/boss/system/menu/per/list.do')
export const getAllMainMenu = getBossWebFullUrl('/boss/system/menu/first/all/list.do')
export const getAllSubMenu = getBossWebFullUrl('/boss/system/menu/child/all/list.do')

export const getMenuPermission = getBossWebFullUrl('/boss/system/menu/list/permission.do')

export const createPermission = getBossWebFullUrl('/boss/permission/create.do')
export const updatePermission = getBossWebFullUrl('/boss/permission/update.do')
export const deletePermission = getBossWebFullUrl('/boss/permission/delete.do')
export const updateStatusPermission = getBossWebFullUrl('/boss/permission/updateStatus.do')


