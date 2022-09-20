import {bizApi, upload, get_upload_url} from '../bizApiUtils';


export const api = bizApi;

import config from '@/config';

const {TAKEAWAY_MER, MERCHANT_BOSS_WEB, MARKET_BOSS_WEB, TakeawayProduct, TakeawayDelivery} = config.moduleUrl;

/* *******************   门店管理  **********************/

// 门店列表
export const queryStoreList = `${TAKEAWAY_MER}/boss/list.do`;
//门店列表查询
export const queryStoreListRes = params => api(params, `${TAKEAWAY_MER}/boss/list.do`)
// 全部门店-筛选用
export const queryStoreListAll = `${TAKEAWAY_MER}/boss/list-all.do`;
// 门店详情
export const queryStoreDetail = `${TAKEAWAY_MER}/boss/get`;
// 门店简要详情
export const queryStoreBriefDetail = `${TAKEAWAY_MER}/boss/brief-info`;
// 门店新增
export const storeAdd = `${TAKEAWAY_MER}/boss/create.do`;
// 门店禁用
export const storeDisabled = `${TAKEAWAY_MER}/boss/disable.do`;
// 门店启用
export const storeEnable = `${TAKEAWAY_MER}/boss/enable.do`;

// 门店名称校验
export const checkStoreName = `${TAKEAWAY_MER}/boss/check-store-name`;

// 更新门店账户信息
export const storeUpdateAccount = `${TAKEAWAY_MER}/boss/account-info/update.do`;
// 更新门店基本信息
export const storeUpdateBasic = `${TAKEAWAY_MER}/boss/basic-info/update.do`;
// 更新门店结算信息
export const storeUpdateBilling = `${TAKEAWAY_MER}/boss/billing-info/update.do`;
// 更新门店业务信息
export const storeUpdateBusiness = `${TAKEAWAY_MER}/boss/business-info/update.do`;
// 更新门店配送信息
export const storeUpdateDelivery = `${TAKEAWAY_MER}/boss/delivery-setting/update.do`;
// 更新门店资质信息
export const storeUpdateQualification = `${TAKEAWAY_MER}/boss/qualification-info/update.do`;

// 查询经营范围
export const queryBusinessScope = `${TAKEAWAY_MER}/boss/business-scopes/list.do`;
//查询经营类型
export const queryBusinessType = `${TAKEAWAY_MER}/boss/classification-store-operation/listNoCount`

// 查询门店权限列表
export const storeAuthList = `${TAKEAWAY_MER}/boss/store-permissions.do`;
// 添加门店权限
export const storeAuthAdd = `${TAKEAWAY_MER}/boss/store-permissions/add.do`;
// 删除门店权限
export const storeAuthRemove = `${TAKEAWAY_MER}/boss/store-permissions/remove`;
// 编辑门店权限
export const storeAuthUpdate = `${TAKEAWAY_MER}/boss/store-permissions/update.do`;
// 查询某个账号下的门店列表
export const storeAuthStores = `${TAKEAWAY_MER}/boss/store-permissions/stores.do`;
// 查询所有销售员列表
export const querySalesmanList = `${TAKEAWAY_MER}/boss/store-permissions/list.do`
// 查询城市列表
export const queryCityList = `${TAKEAWAY_MER}/boss/city/list.do`
// 查询部门列表
export const queryDepartmentsList = `${TAKEAWAY_MER}/boss/dict/departments`
// 查询区域列表
export const queryRegionsList = `${TAKEAWAY_MER}/boss/dict/regions`
// 查询商圈列表
export const queryCommercialDistricts = `${TAKEAWAY_MER}/boss/dict/commercial-districts`
// 查询门店经纬度所属的配送站
export const queryStoreInnerStation = `${TakeawayDelivery}/boss/station/store-inner-station/list.do`

//获取商圈
export const queryCommercialDistrictList = `${TAKEAWAY_MER}/boss/commercialDistrict/get-by-cityCode`

// 查询是否是销售
export const querySalesmanInfo = `${TAKEAWAY_MER}/boss/store-permissions/salesman-info`

// 商户列表
export const queryMerchantList = `${MERCHANT_BOSS_WEB}/superapp/mer/query/store/merchant/list.do`;

// 关联商户列表
export const relatedMerchantList = `${MERCHANT_BOSS_WEB}/superapp/mer/query/merchant/list.do`;

// 门店营销详情
// export const storeMarketing = `${MARKET_BOSS_WEB}/marketing/takeaway/merchant/getStoreActivityInformation.do`
// 门店营销-门店活动详情-换成此接口
export const storeMarketing = `${MARKET_BOSS_WEB}/marketing/takeaway/merchant/getStoreActivityInfoRevise.do`
// 门店营销终止活动
export const stopMarketing = `${MARKET_BOSS_WEB}/marketing/takeaway/merchant/stop.do`;
// 门店营销启动活动
export const enableMarketing = `${MARKET_BOSS_WEB}/marketing/takeaway/merchant/enable.do`;
// 门店营销暂停活动
export const disableMarketing = `${MARKET_BOSS_WEB}/marketing/takeaway/merchant/disable.do`;
// 门店营销审核活动
export const auditMarketing = `${MARKET_BOSS_WEB}/marketing/takeaway/merchant/audit.do`;

//根据门店名称模糊查询接口
export const dropdownQueryStoreList = `${TAKEAWAY_MER}/boss/store/dropdown/query`;
//根据商户名称模糊查询接口
export const dropdownQueryMerchantList = `${TAKEAWAY_MER}/boss/merchant/dropdown/query`;

//门店排序
export const storeSortQuery = `${TAKEAWAY_MER}/boss/sort/query`;
//门店删除
export const storeSortDelete = `${TAKEAWAY_MER}/boss/sort/remove`;
//更新/创建
export const storeSortUpdate = `${TAKEAWAY_MER}/boss/sort/update`;

// 门店优惠券列表
export const storeCouponList = params => api(params, `${TAKEAWAY_MER}/boss/store-coupon/list`);

// 创建门店优惠券
export const storeCouponCreate = params => api(params, `${TAKEAWAY_MER}/boss/store-coupon/create`);

// 修改门店优惠券
export const storeCouponUpdate = params => api(params, `${TAKEAWAY_MER}/boss/store-coupon/update`);

// 门店优惠券详情
export const storeCouponDetail = params => api(params, `${TAKEAWAY_MER}/boss/store-coupon/detail`);

// 根据优惠券获取当前活动详情
export const storeCouponGetCouponJoinActivity = params => api(params, `${TAKEAWAY_MER}/boss/store-coupon/get-coupon-join-activity`);

// 门店优惠券日志列表
export const storeCouponLogList = params => api(params, `${TAKEAWAY_MER}/boss/store-coupon/log/list`);

// 门店优惠券日志详情
export const storeCouponLogDetail = params => api(params, `${TAKEAWAY_MER}/boss/store-coupon/log/detail`);

//门店平台活动列表查询
export const storeActivityList = params => api(params, `${MARKET_BOSS_WEB}/marketing/takeaway/store/activity/list.do`);

//门店详情-平台活动列表查询
export const platformActivityList = params => api(params, `${MARKET_BOSS_WEB}/marketing/takeaway/activity/multiState/list.do`);

//根据门店获取活动
export const fullGiftActivityList = params => api(params, `${TakeawayProduct}/boss/full-gift-activity/getActivityByStoreNo`);

//门店库存管理
export const giftManageStoreStock = params => api(params, `${TakeawayProduct}/boss/gift/manageStoreStock`);

export const storeAudit = `${TAKEAWAY_MER}/boss/audit/submit`;

export const storeAuditPass = `${TAKEAWAY_MER}/boss/audit/pass`;

export const storeAuditReject = `${TAKEAWAY_MER}/boss/audit/reject`;


// 导入商品
export const exportStoreReport = `${TAKEAWAY_MER}/boss/store-report/export`

export const storeStatusChangeLog = `${TAKEAWAY_MER}/boss/status-change-log`

// 门店分类下面查询门店信息
export const getBusinessAndMerchant = `${TAKEAWAY_MER}/boss/get-business-and-merchant`;

// 修改分类绑定商家信息
export const businessAndMerchantEdit = `${TAKEAWAY_MER}/boss/business-and-merchant-edit`;

// 审核门店列表修改关联分类
export const updateBusinessScopesAtAudit = `${TAKEAWAY_MER}/boss/update-businessScopes-at-audit`;

// 导出分类绑定商家信息
export const businessAndMerchantExport = params => api(params, `${TAKEAWAY_MER}/boss/business-and-merchant-export`)

// 导入门店分类信息，只支持XLSX格式导入
export const businessAndMerchantImport = params => {
  let formData = new FormData()
  Object.keys(params).forEach(key => {
    formData.append(key, params[key])
  })
  return upload(formData, get_upload_url(`${TAKEAWAY_MER}/boss/business-and-merchant-import`));
}
// 导出每日门店统计
export const exportStoreBusiness = params => api(params, `${TAKEAWAY_MER}/boss/statistics/export-store-business`)


export const exportRiderMonthlyReport = `${TakeawayDelivery}/boss/rider/rider-month-report/export.do`


export const queryCommercialDistrict = params => api(params, `${TAKEAWAY_MER}/boss/commercialDistrict/get-by-geo`);

// 查询城市
export const queryCityByGeo = params => api(params, `${TAKEAWAY_MER}/boss/city/list-for-geo`);

// 校验门店是否符合资格更换商户
export const checkChangeMerchant = params => api(params, `${TAKEAWAY_MER}/boss/check-change-merchant`);

// 更换门店绑定商户
export const changeMerchant = params => api(params, `${TAKEAWAY_MER}/boss/change-merchant`);

//外卖团购关联关系列表
export const takeawayGrouponAssociationList = params => api(params, `${TAKEAWAY_MER}/boss/takeawayGrouponRel/findList`);
//外卖团购关联关系导出
export const exportTakeawayGrouponAssociation = `${TAKEAWAY_MER}/boss/takeawayGrouponRel/export`
//创建外卖团购关联关系
export const createTakeawayGrouponAssociation = params => api(params, `${TAKEAWAY_MER}/boss/takeawayGrouponRel/create`);
//删除外卖团购关联关系
export const delTakeawayGrouponAssociation = params => api(params, `${TAKEAWAY_MER}/boss/takeawayGrouponRel/delete`);
//导入外卖团购关联关系
export const importTakeawayGrouponAssociation = params => {
  let formData = new FormData()
  Object.keys(params).forEach(key => {
    formData.append(key, params[key])
  })
  return upload(formData, get_upload_url(`${TAKEAWAY_MER}/boss/takeawayGrouponRel/import`));
}
//外卖团购关联关系日志
export const takeawayGrouponAssociationLog = params => api(params, `${TAKEAWAY_MER}/boss/takeawayGrouponRel/logs`)
//编辑外卖团购关联关系
export const editTakeawayGrouponAssociation = params => api(params, `${TAKEAWAY_MER}/boss/takeawayGrouponRel/update`)
//修改关联状态
export const editTakeawayGrouponAssociationStatus = params => api(params, `${TAKEAWAY_MER}/boss/takeawayGrouponRel/updateRelStatus`)
//门店出餐时间列表
export const storeMealTimeList = params => api(params, `${TAKEAWAY_MER}/boss/store-meal/query/list`)
//修改备餐时间
export const editStoreMealTime = params => api(params, `${TAKEAWAY_MER}/boss/store-meal/info/update`)
//门店出餐时间详情
export const detailStoreMealTime = params => api(params, `${TAKEAWAY_MER}/boss/store-meal/info/details`)
