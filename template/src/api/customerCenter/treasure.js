import apiUtil from '../apiUtil'
import config from '@/config'
export const api = apiUtil
const { AIR_MEMBER_WEB } = config.moduleUrl

/* *******************   积分夺宝  **********************/
// 商品列表
export const apiTreasureHuntGoods = params => api(params, `${AIR_MEMBER_WEB}/manager/treasureHuntGoods/page`)
// 上下架
export const apiUpdateGoodsStatus = params => api(params, `${AIR_MEMBER_WEB}/manager/treasureHuntGoods/updateTreasureGoodsStatus`)
// 查看详情
export const apiGoodsDetail = params => {
  const { treasureGoodsId } = params
  let url = `${AIR_MEMBER_WEB}/manager/treasureHuntGoods/detail/${treasureGoodsId}`
  return api(params, url)
}
// 导出
export const apiGoodsExport = `${AIR_MEMBER_WEB}/manager/treasureHuntGoods/export`
// 新增商品信息
export const apiSaveGoods = params => api(params, `${AIR_MEMBER_WEB}/manager/treasureHuntGoods/saveTreasureGoods`)
// 编辑商品信息
export const apiUpdateGoods = params => api(params, `${AIR_MEMBER_WEB}/manager/treasureHuntGoods/updateTreasureGoods`)

/* *******************   参与记录  **********************/
// 列表
export const apiTreasureRecord = params => api(params, `${AIR_MEMBER_WEB}/manager/treasureAttendRecord/page`)
// 查看详情
export const apiRecordDetail = params => {
  const { recordId } = params
  let url = `${AIR_MEMBER_WEB}/manager/treasureAttendRecord/detail/${recordId}`
  return api(params, url)
}
// 导出
export const apiRecordExport = `${AIR_MEMBER_WEB}/manager/treasureAttendRecord/export`

/* *******************   中奖用户  **********************/
// 列表
export const apiWinnerList = params => api(params, `${AIR_MEMBER_WEB}/manager/treasureWinnerInfo/page`)
// 查看详情
export const apiWinnerDetail = params => {
  const { infoId } = params
  let url = `${AIR_MEMBER_WEB}/manager/treasureWinnerInfo/detail/${infoId}`
  return api(params, url)
}
// 导出
export const apiWinnerExport = `${AIR_MEMBER_WEB}/manager/treasureWinnerInfo/export`
// 编辑奖品发放状态
export const apiUpdateexchangeStatus = params => api(params, `${AIR_MEMBER_WEB}/manager/treasureWinnerInfo/updateStatus`)