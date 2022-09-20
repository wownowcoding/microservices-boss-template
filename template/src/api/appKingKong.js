import apiUtil from '@/api/apiUtil'
export const api = apiUtil

import config from '@/config'
const { BOSS_WEB } = config.moduleUrl

/* *******************   金刚区管理  **********************/

// 查询
export const funcGuideQuery = `${BOSS_WEB}/config/funcGuide/query.do`

// 新增
export const funcGuideAdd = `${BOSS_WEB}/config/funcGuide/add.do`

// 编辑
export const funcGuidePpdate = `${BOSS_WEB}/config/funcGuide/update.do`

// 序列
export const funcGuideMove = `${BOSS_WEB}/config/funcGuide/move.do`

// id_query
export const funcGuideGet = `${BOSS_WEB}/config/funcGuide/get.do`

/* *******************   底部导航  **********************/
// 查询
export const tabBarQuery = `${BOSS_WEB}/config/tabBar/query.do`

// 编辑
export const tabBarUpdate = `${BOSS_WEB}/config/tabBar/update.do`

// id_query
export const tabBarGuideGet = `${BOSS_WEB}/config/tabBar/get.do`

// 新增
export const tabBarAdd = `${BOSS_WEB}/config/tabBar/add.do`

// 移动
export const tabBarMove = `${BOSS_WEB}/config/tabBar/move.do`
// 移动
export const tabBarDelete = `${BOSS_WEB}/config/tabBar/delete.do`
export const wownowHomePage = `${BOSS_WEB}/config/banner/v2/queryWownowList.do`

export const editWownowConfig = `${BOSS_WEB}/config/banner/v2/editWownowConfig.do`

export const moveWownowBottomConfig = `${BOSS_WEB}/config/banner/v2/moveWownowBottomConfig.do`

export const moveWownowBanner = `${BOSS_WEB}/config/banner/v2/moveWownowBanner.do`

export const addWownowBottomAds = `${BOSS_WEB}/config/banner/v2/addWownowBottomAds.do`

export const addWownowBannerAds = `${BOSS_WEB}/config/banner/v2/addWownowBannerAds.do`
