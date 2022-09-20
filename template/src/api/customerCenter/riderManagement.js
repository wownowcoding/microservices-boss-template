import apiUtil from '../apiUtil';
export const api = apiUtil;
import {upload, get_upload_url} from '../bizApiUtils';
import config from '@/config';
const { TakeawayDelivery } = config.moduleUrl;

/* *******************   骑手管理  **********************/

// 列表
export const queryRiderList = `takeaway-delivery/boss/rider/query/list.do`;
// 详情
export const queryRiderDetail = `takeaway-delivery/boss/rider/query/detail.do`;
// 新增
export const riderAdd = `takeaway-delivery/boss/rider/create.do`;
// 编辑
export const riderEdit = `takeaway-delivery/boss/rider/update.do`;
// Delete rider
export const riderDelete = `takeaway-delivery/boss/rider/delete.do`;


// 操作员是否存在
export const checkLoginName = `usercenter-boss/usercenter/member/checkLoginName.do`;

/* *******************   派单记录  **********************/
export const dispatchRecordList = params => api(params, `${TakeawayDelivery}/boss/rider/rider-dispatch-info/list.do`);

// 派单记录-订单明细
export const deliveryFinishList = params => api(params, `${TakeawayDelivery}/boss/delivery-order/delivery-finish/list.do`);

/* *******************   骑手信息  **********************/
// 列表
export const riderInfoList = params => api(params, `${TakeawayDelivery}/boss/rider/rider-info/list.do`);
// 锁定解锁
export const riderLock = params => api(params, `${TakeawayDelivery}/boss/rider/lock-unlock/action.do`);
// 详情
export const riderDetailInfo = params => api(params, `${TakeawayDelivery}/boss/rider/rider-info-detail/query.do`);
// 编辑
export const riderInfoEdit = params => api(params, `${TakeawayDelivery}/boss/rider/rider-info-edit/query.do`);
// Rider online status
export const getRiderTimeList = params => api(params, `${TakeawayDelivery}/boss/rider/rider-time-record/list.do`);
//统计在职离职数量
export const riderListCount = params => api(params,`${TakeawayDelivery}/boss/rider/status/count/get.do`)
//骑手离职操作
export const riderResign = params => api(params, `${TakeawayDelivery}/boss/rider/resign/action.do`);
//导出在职骑手信息
export const  onWorkRiderInfoExport = `${TakeawayDelivery}/boss/rider/onJob/export.do`
//导出离职骑手信息
export const  resignRiderInfoExport = `${TakeawayDelivery}/boss/rider/resign/export.do`

// 查询骑手日志记录
export const riderLogList = params => api(params, `${TakeawayDelivery}/boss/rider/query-log/list.do`);

/* *******************   代收款管理  **********************/

//站点现金报表查询
export const siteCashList = params => api(params, `${TakeawayDelivery}/boss/cash/station/list.do`);

//骑手现金收款详情查询
export const riderCashDetailList = params => api(params, `${TakeawayDelivery}/boss/cash/rider-detail/list.do`);

//骑手现金报表查询
export const riderCashStatement = params => api(params, `${TakeawayDelivery}/boss/cash/rider/list.do`);

//骑手按日对账查询
export const riderCashByDay = params => api(params, `${TakeawayDelivery}/boss/cash/rider-by-day/list.do`);

//确认记录查询
export const cashConfirmGet = params => api(params, `${TakeawayDelivery}/boss/cash/confirm/get.do`);

// 骑手离职恢复在职
export const riderOnJobAction = params => api(params, `${TakeawayDelivery}/boss/rider/on-job/action.do`);


//站点现金报表导出
export const siteCashExport = `${TakeawayDelivery}/boss/cash/station/export.do`

//骑手现金报表导出
export const riderCashExport = `${TakeawayDelivery}/boss/cash/rider/export.do`

//骑手按日对账导出
export const riderCashByDayExport = `${TakeawayDelivery}/boss/cash/rider-by-day/export.do`

//骑手现金收款详情导出
export const riderCashDetailExport = params => api(params, `${TakeawayDelivery}/boss/cash/rider-detail/export.do`);

/**
 * 骑手自定义标签列表
 * @param params
 */
export const riderLabelList = params => api(params,`${TakeawayDelivery}/boss/rider/rider-label-/list.do`)
/**
 * 骑手自定义标签导入
 * @param params
 * @returns {*}
 */
export const importRiderLabel = params => {
     let formData  = new FormData();
     Object.keys(params).forEach(key => formData.append(key,params[key]));
     return  upload(formData,get_upload_url(`/${TakeawayDelivery}/boss/rider/rider-label-import`))
}
