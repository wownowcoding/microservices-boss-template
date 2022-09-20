
import apiUtil from './apiUtil'
import { curl } from "./bizApiUtils";
export const api = apiUtil

import config from '@/config'
const { BOSS_WEB, MERCHANT_BOSS_WEB } = config.moduleUrl

/* *******************   banner管理  **********************/

// 超A banner
export const superBannerList = `${BOSS_WEB}/config/banner/v2/querySuperApp.do` // 列表
export const superBannerAdd = `${BOSS_WEB}/config/banner/v2/createSuperApp.do` // 新增
export const superBannerEdit = `${BOSS_WEB}/config/banner/v2/updateSuperApp.do` // 编辑
export const superBannerDetail = `${BOSS_WEB}/config/banner/v2/selectSuperApp.do` // 详情

// 外卖 banner
export const yumNowBannerList = `${BOSS_WEB}/config/banner/v2/queryYumNow.do` // 列表
export const yumNowBannerAdd = `${BOSS_WEB}/config/banner/v2/createYumNow.do` // 新增
export const yumNowBannerEdit = `${BOSS_WEB}/config/banner/v2/updateYumNow.do` // 编辑
export const yumNowBannerDetail = `${BOSS_WEB}/config/banner/v2/selectYumNow.do` // 详情
export const yumNowBannerDelete = `${BOSS_WEB}/config/banner/v2/deleteYumNowAds.do` // 删除

// 电商 banner
export const tinhNowBannerList = `${BOSS_WEB}/config/banner/v2/queryTinhNow.do` // 列表
export const tinhNowBannerAdd = `${BOSS_WEB}/config/banner/v2/createTinhNow.do` // 新增
export const tinhNowBannerEdit = `${BOSS_WEB}/config/banner/v2/updateTinhNow.do` // 编辑
export const tinhNowBannerDetail = `${BOSS_WEB}/config/banner/v2/selectTinhNow.do` // 详情

export const getTinhNowPageList = `${BOSS_WEB}/config/banner/v2/searchAutoPageList.do` // 电商首页页面列表
export const addTinhNowPage = `${BOSS_WEB}/config/banner/v2/addAutoNewPage.do` // 新增电商页面
export const updateTinhNowPage = `${BOSS_WEB}/config/banner/v2/editAutoNewPage.do` // 编辑电商页面
export const deleteTinhNowPage = `${BOSS_WEB}/config/banner/v2/deleteAutoPage.do` // 删除电商页面
export const getTinhNowPageDetail = `${BOSS_WEB}/config/banner/v2/searchAutoPageDetail.do` // 获取电商页面详情

export const bannerClose = `${BOSS_WEB}/config/banner/v2/close.do` // 关闭
export const bannerPublish = `${BOSS_WEB}/config/banner/v2/publish.do` // 发布
export const bannerLog= `${BOSS_WEB}/config/banner/v2/log.do` // 操作日志

export const storeList= `${MERCHANT_BOSS_WEB}/superapp/mer/query/store/list.do` // 电商门店列表

/* *******************   发现页管理  **********************/

// export const promotion_list = `${BOSS_WEB}/config/promotion/query.do`
// export const promotion_create = `${BOSS_WEB}/config/promotion/create.do`
// export const promotion_update = `${BOSS_WEB}/config/promotion/edit.do`
// export const promotion_publish = `${BOSS_WEB}/config/promotion/publish.do`
// export const promotion_soldout = `${BOSS_WEB}/config/promotion/close.do`
// export const promotion_detail = `${BOSS_WEB}/config/promotion/detail.do`
export const promotion_log = `${BOSS_WEB}/config/promotion/log.do`
export const promotion_merchant = `${BOSS_WEB}/config/promotion/merchant.do`

export const promotion_soldout = `${BOSS_WEB}/discovery/promotion/close.do` // 下架优惠信息
export const promotion_create = `${BOSS_WEB}/discovery/promotion/create.do` // 创建优惠信息
export const promotion_detail = `${BOSS_WEB}/discovery/promotion/detail.do` // 查询优惠详情
export const promotion_update = `${BOSS_WEB}/discovery/promotion/edit.do` // 编辑优惠信息
export const promotion_list = `${BOSS_WEB}/discovery/promotion/list.do` // 查询优惠信息
export const promotion_publish = `${BOSS_WEB}/discovery/promotion/publish.do` // 发布优惠信息

/* *******************   发现页管理  **********************/
export const promotion_business_create = `${BOSS_WEB}/discovery/business/create.do` // 新增商业类型
export const promotion_business_detail = `${BOSS_WEB}/discovery/business/detail.do` // 商业类型详情
export const promotion_business_edit = `${BOSS_WEB}/discovery/business/edit.do` // 编辑商业类型
export const promotion_business_list = `${BOSS_WEB}/discovery/business/list.do` // 商业类型列表
export const promotion_business_move = `${BOSS_WEB}/discovery/business/move.do` // 移动商业类型
export const promotion_business_remove = `${BOSS_WEB}/discovery/business/remove.do` // 删除商业类型

/**
 * 弹窗管理
 */
export const popAdsAdd = `${BOSS_WEB}/config/popAds/add.do`
export const popAdsList = `${BOSS_WEB}/config/popAds/getPopAdsList.do`
export const popAdsDetail = `${BOSS_WEB}/config/popAds/getPopAdsDetail.do`
export const popAdsLog = `${BOSS_WEB}/config/popAds/getPopLogs.do`
export const popAdsUpdate = `${BOSS_WEB}/config/popAds/updatePop.do`
export const popAdsDelete = `${BOSS_WEB}/config/popAds/deletePop.do`
export const popAdsSetting = `${BOSS_WEB}/config/popAds/getPopSetting.do`
export const popAdsSettingUpdate = `${BOSS_WEB}/config/popAds/updatePopSetting.do`
export const popAdsSettingTurn = `${BOSS_WEB}/config/popAds/turnPop.do`
export const turnPopYumnow = `${BOSS_WEB}/config//popAds/turnPopYumnow.do`

export const configPopAdsGetPopAdsList = (params, config) => curl(params, popAdsList, config);
export const configPopAdsGetPopDetail = (params, config) => curl(params, popAdsDetail, config);
export const configPopAdsGetPopAdsAdd = (params, config) => curl(params, popAdsAdd, config);
export const configPopAdsGetPopAdsUpdate = (params, config) => curl(params, popAdsUpdate, config);
export const configPopAdsGetPopAdsDelete = (params, config) => curl(params, popAdsDelete, config);
export const configPopAdsGetPopAdsEnd = (params, config) => curl(params, turnPopYumnow, config);
export const configPopAdsGetPopGetAdsZoneList = (params, config) => curl(params, getAdsZoneList, config);

export const tinhNowBannerQuery = `${BOSS_WEB}/config/banner/v2/getTinNow.do`
export const tinhNowAdvAdd = `${BOSS_WEB}/config/banner/v2/addTinnow.do`
export const tinhNowOpenOrCloseCard = `${BOSS_WEB}/config/banner/v2/openOrCloseCard.do`
export const tinhNowDeleteCard = `${BOSS_WEB}/config/banner/v2/deleteCard.do`
export const tinhNowUpdateCard = `${BOSS_WEB}/config/banner/v2/updateNewCardTypePage.do`
export const tinhNowMoveCard = `${BOSS_WEB}/config/banner/v2/moveWownowAreaConfig.do`
export const tinhNowOperatorLog = `${BOSS_WEB}/config/banner/v2/getAreaOperatorLog.do`

// 修改弹窗广告

// 修改弹窗广告
export const hotWordList = `${BOSS_WEB}/config/hotWord/list.do`
export const hotWordConfig = `${BOSS_WEB}/config/hotWord/config.do`


export const getAdsZoneList = `${MERCHANT_BOSS_WEB}/superapp/mer/zone/list.do` // 查询国家列表
