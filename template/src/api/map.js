/*
 * @Description: 地图管理API
 * @Author: 管铭钊
 * @LastEditors: 管铭钊
 * @Date: 2019-05-11 09:41:50
 * @LastEditTime: 2019-05-11 09:42:20
 */
import apiUtil from './apiUtil'

export const api = apiUtil

import config from '@/config';

const { BOSS_WEB } = config.moduleUrl

//地图网点接口
export const branch_add = `${BOSS_WEB}/cash/boss/address/branch/add.do` // APP配置中心-地图管理-添加
export const branch_modify = `${BOSS_WEB}/cash/boss/address/branch/modify.do` // APP配置中心-地图管理-修改
export const branch_delete = `${BOSS_WEB}/cash/boss/address/delete.do` // APP配置中心-地图管理-删除
export const branch_detail = `${BOSS_WEB}/cash/boss/address/detail.do` // APP配置中心-地图管理-详情
export const branch_list = `${BOSS_WEB}/cash/boss/address/list.do` // APP配置中心-地图管理-列表
export const pay_branch_add = `${BOSS_WEB}/cash/boss/address/paygo/add.do` // APP配置中心-地图管理-PAYGO添加
export const pay_branch_modify = `${BOSS_WEB}/cash/boss/address/paygo/modify.do` // APP配置中心-地图管理-PAYGO修改
export const store_query = `${BOSS_WEB}/cash/boss/branch/list.do` // APP配置中心-地图管理-查询地址列表



