import apiUtil from '../apiUtil'
import config from '@/config'
export const api = apiUtil
const { AIR_MEMBER_WEB } = config.moduleUrl
console.log(config.moduleUrl)

/* *******************   任务专区  **********************/
// 列表
export const taskAreaList = params => api(params, `${AIR_MEMBER_WEB}/manager/taskArea/page`)
// 状态
export const apiUpdateTaskAreaStatus = params => api(params, `${AIR_MEMBER_WEB}/manager/taskArea/updateTaskAreaStatus`)
// 查看详情
export const apiTaskAreaDetail = params => {
  const { areaId } = params
  let url = `${AIR_MEMBER_WEB}/manager/taskArea/detail/${areaId}`
  return api(params, url)
}
// 新增商品信息
export const apiSaveTaskArea = params => api(params, `${AIR_MEMBER_WEB}/manager/taskArea/saveTaskArea`)
// 编辑商品信息
export const apiUpdateTaskArea = params => api(params, `${AIR_MEMBER_WEB}/manager/taskArea/updateTaskArea`)

/* *******************   任务配置  **********************/
// 列表
export const taskConfigList = params => api(params, `${AIR_MEMBER_WEB}/manager/taskConfig/page`)
// 状态
export const apiUpdateTaskConfigStatus = params => api(params, `${AIR_MEMBER_WEB}/manager/taskConfig/updateTaskConfigStatus`)
// 查看详情
export const apiTaskConfigDetail = params => {
  const { taskId } = params
  let url = `${AIR_MEMBER_WEB}/manager/taskConfig/detail/${taskId}`
  return api(params, url)
}
// 新增商品信息
export const apiSaveTaskConfig = params => api(params, `${AIR_MEMBER_WEB}/manager/taskConfig/saveTaskConfig`)
// 编辑商品信息
export const apiUpdateTaskConfig = params => api(params, `${AIR_MEMBER_WEB}/manager/taskConfig/updateTaskConfig`)
// 查看所有启用的专区
export const queryAllValidArea = params => api(params, `${AIR_MEMBER_WEB}/manager/taskArea/queryAllValidArea`)
// 关联任务弹窗列表
// 列表
export const queryAssociationTaskList = params => api(params, `${AIR_MEMBER_WEB}/manager/taskConfig/queryAssociationTaskList`)

