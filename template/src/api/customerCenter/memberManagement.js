import apiUtil from '../apiUtil';
import { curl } from "../bizApiUtils";
export const api = apiUtil;

import config from '@/config';
// const { BOSS_WEB } = config.moduleUrl
const { USER_WEB, MERCHANT_BOSS_WEB, SHOP_BOSS, MARKET_BOSS_WEB, AIR_MEMBER_WEB } = config.moduleUrl;

/* *******************   会员管理  **********************/

// 会员列表
export const queryMemberList = (params, config) => curl(params, `${USER_WEB}/usercenter/member/list.do`, config);


// 会员详情
export const queryMemberDetail = `${USER_WEB}/usercenter/member/detail.do`;

// 更新会员状态
export const memberUpdateState = (params, config) => curl(params, `${USER_WEB}/usercenter/member/updateStatus.do`, config);

// 会员消费报告
export const memberConsumeReport = `${SHOP_BOSS}/member/report/detail`;
// 会员优惠券信息
export const memberCouponReport = `${MARKET_BOSS_WEB}/user/coupon/countEachState.do`;

export const getUserOperationRecordList = (params) => api(params, `${USER_WEB}/usercenter/member/queryUserOperatorLoginLog.do`)

export const getLogoutUserList = (params) => api(params, `${USER_WEB}/usercenter/member/queryUserOperatorLoginLog.do`)

//  踢出用户
export const memberLogout = (params, config) => curl(params, `${USER_WEB}/cancellation/pageCancellationRecord.do`, config);
export const memberLogoutURL = `${USER_WEB}/cancellation/pageCancellationRecord.do`
export const memberLogoutNew = (params, config) => curl(params, `${USER_WEB}/usercenter/member/logout.do`, config);

// 退出登录
export const memberQuit = (params, config) => curl(params, `${USER_WEB}/usercenter/member/logout.do`, config);

// 撤销注销请求
export const revocationUserLogout = (params, config) => curl(params, `${USER_WEB}/cancellation/cancelCancellation.do`, config);

// 获取会员等级名称下拉选项
export const queryNextLevel = params => api(params, `${USER_WEB}/point/userLevel/queryNextLevelData.do`);

// 会员等级列表
export const queryMemberLevelList = params => api(params, `${USER_WEB}/point/userLevel/queryUserLevelList.do`);
export const addMemberLevel = params => api(params, `${USER_WEB}/point/userLevel/addUserLevel.do`);
export const editMemberLevel = params => api(params, `${USER_WEB}/point/userLevel/editUserLevel.do`);
export const deleteMemberLevel = params => api(params, `${USER_WEB}/point/userLevel/deleteUserLevel.do`);
export const queryUserLevelDetail = params => api(params, `${USER_WEB}/point/userLevel/queryUserLevelDetail.do`);

// 查询会员等级变更记录
export const changehistory = params => api(params, `${USER_WEB}/point/growth/change/history.do`);

// 查询会员成长值列表
export const searchMemberGrowth = params => api(params, `${USER_WEB}/point/growth/searchMemberGrowth.do`);
// 获取pointType下拉选择器
export const selecPointTypeSelective = params => api(params, `${USER_WEB}/point/growth/selecPointTypeSelective.do`);

// 用户积分历史查询
export const queryMemberIntegral = params => api(params, `${USER_WEB}/point/history/list.do`);
export const queryMemberIntegralUrl = `${USER_WEB}/point/history/list.do`

// http://svc-lifekh-gm-service-member-center-web-sit.lifekh-gm-sit.svc.cluster.local:8080/cam-member-center/swagger-ui.html#/
// 积分 - 商品管理列表
export const queryPointGoods = params => api(params, `${AIR_MEMBER_WEB}/manager/pointsGoods/page`);
// 商品详情
export const queryPointGoodDetail = params => {
  const { id } = params
  let url = `${AIR_MEMBER_WEB}/manager/pointsGoods/detail/${id}`
  return api(params, url)
}
// 新增商品
export const addPointGoodItem = params => api(params, `${AIR_MEMBER_WEB}/manager/pointsGoods/savePointsGoods`);

// 新增商品页 - 枚举列表
// export const getQueryEnum = (params, type) => api(params, `${AIR_MEMBER_WEB}/common/queryEnum/${type}`);
export const getQueryEnum = (params) => api(params, `${AIR_MEMBER_WEB}/common/queryEnum`);

// 更新商品
export const updatePointGoodItem = params => api(params, `${AIR_MEMBER_WEB}/manager/pointsGoods/updatePointsGoods`);
// 删除商品
export const removePointGood = params => {
  const { id } = params
  let url = `${AIR_MEMBER_WEB}/manager/pointsGoods/deletePointsGoodsStatus/${id}`
  return api(params, url)
}
export const getCouponList = params => api(params, `${AIR_MEMBER_WEB}/manager/pointsGoods/coupons/page`)

// 更新上下架状态
export const updatePointGoodStatus = params => api(params, `${AIR_MEMBER_WEB}/manager/pointsGoods/updatePointsGoodsStatus`)
// 商品排序
export const goodsSort = (params) => api(params, `${AIR_MEMBER_WEB}/manager/pointsGoods/goodsSort`);
// http://svc-lifekh-gm-service-member-center-web-sit.lifekh-gm-sit.svc.cluster.local:8080/cam-member-center/swagger-ui.html#/%E7%A7%AF%E5%88%86%E6%B6%88%E8%B4%B9-%E8%AE%A2%E5%8D%95%E7%AE%A1%E7%90%86
// 积分 - 订单管理
export const queryCreditOrderList = params => api(params, `${AIR_MEMBER_WEB}/manager/pointsOrder/page`);
export const queryCreditOrderDetail = params => {
  const { id } = params
  let url = `${AIR_MEMBER_WEB}/manager/pointsOrder/detail/${id}`
  return api(params, url)
}
// 导出
export const apiRecordExport = `${AIR_MEMBER_WEB}/manager/pointsOrder/export`
// https://yapi.lifekh.com:8443/project/69/interface/api/cat_7975
// 查询会员等级下的权益列表
export const queryUserPrivilegeList = params => api(params, `${USER_WEB}/point/userLevel/queryUserPrivilegeList.do`);
// 删除单个会员等级下的权益
export const deleteUserSinglePrivilege = params => api(params, `${USER_WEB}/point/userLevel/deleteUserSinglePrivilege.do`);

// 会员 投诉反馈信息相关
// http://svc-lifekh-gm-service-member-center-web-sit.lifekh-gm-sit.svc.cluster.local:8080/cam-member-center/swagger-ui.html#/%E6%8A%95%E8%AF%89%E5%8F%8D%E9%A6%88%E4%BF%A1%E6%81%AF%E7%9B%B8%E5%85%B3-%E7%AE%A1%E7%90%86%E5%91%98%E7%AB%AF/handlerComplaintFeedbackUsingPOST
export const handlerMemberFeedbackApi = params => {
  const url = `${AIR_MEMBER_WEB}/manager/complaint/feedback/handlerFeedback`
  return api(params, url)
}
// 投诉反馈信息列表
export const memberFeedbackListApi = params => {
  const url = `${AIR_MEMBER_WEB}/manager/complaint/feedback/page`
  return api(params, url)
}
// 投诉反馈信息详情
export const memberFeedbackDetailApi = params => {
  const { feedbackInfoId } = params
  let url = `${AIR_MEMBER_WEB}/manager/complaint/feedback/queryDetails/${feedbackInfoId}`
  return api(params, url)
}

// 会员 手动发积分相关
// 分页查询列表
export const resendPointsQueryPage = params => {
  const url = `${AIR_MEMBER_WEB}/manager/resendPoints/queryPage`
  return api(params, url)
}
// 获取详情
export const resendPointsQueryDetail = params => {
  const { pointsId } = params
  let url = `${AIR_MEMBER_WEB}/manager/resendPoints/queryDetail/${pointsId}`
  return api(params, url)
}
// 新增手工补发积分
export const saveResendPoints = params => {
  const url = `${AIR_MEMBER_WEB}/manager/resendPoints/save`
  return api(params, url)
}
// 批量上传
export const batchSaveResendPoints = params => {
  const url = `${AIR_MEMBER_WEB}/manager/resendPoints/batchSave`
  return api(params, url)
}

// 黑名单相关
//分页查询用户黑名单列表
export const userBlackPage = params => api(params, `${MARKET_BOSS_WEB}/marketing/member/blacklist/user/list`)
// 用户黑名单导入
export const batchSaveUserBlack = params => api(params,`${MARKET_BOSS_WEB}/marketing/member/blacklist/user/import`)
// 新增用户黑名单
export const addUserBlack = params => api(params, `${MARKET_BOSS_WEB}/marketing/member/blacklist/user/add`);
// 根据id获取手机号
export const getPhone = params => api(params, `${USER_WEB}/marketing/operator/info/get.do`);
//根据手机获取id
export const getUserid = params => api(params, `${USER_WEB}/usercenter/member/getOperatorInfoByLoginName.do`);
// 更新用户黑名单
export const updateUserBlack = params => api(params, `${MARKET_BOSS_WEB}/marketing/member/blacklist/user/update`);
// 获取用户黑名单详情
export const userBlackDetail = params => api(params,`${MARKET_BOSS_WEB}/marketing/member/blacklist/user/detail`)
// 删除用户黑名单
export const removeUserBlack = params =>api(params,`${MARKET_BOSS_WEB}/marketing/member/blacklist/user/delete`)
//分页查询商户黑名单列表
export const businessBlackPage = params => api(params, `${MARKET_BOSS_WEB}/marketing/member/blacklist/merchant/list`)
// 商户黑名单导入
export const batchSaveBusinessBlack = params => api(params,`${MARKET_BOSS_WEB}/marketing/member/blacklist/merchant/import`)
// 新增商户黑名单
export const addBusinessBlack = params => api(params, `${MARKET_BOSS_WEB}/marketing/member/blacklist/merchant/add`);
// 更新商户黑名单
export const updateBusinessBlack = params => api(params, `${MARKET_BOSS_WEB}/marketing/member/blacklist/merchant/update`);
// 获取商户黑名单详情
export const businessBlackDetail = params => api(params,`${MARKET_BOSS_WEB}/marketing/member/blacklist/merchant/detail`)
// 删除商户黑名单
export const removeBusinessBlack = params =>api(params,`${MARKET_BOSS_WEB}/marketing/member/blacklist/merchant/delete`)

export const queryUserOperatorUpdateStatus = params =>api(params,`${USER_WEB}/usercenter/member/queryUserOperatorUpdateStatus.do`)
