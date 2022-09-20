/*
* @describe 白名单模块接口地址 + 用户账户
* @auth rico
* @date 2018/10/22
*/

import apiUtil from './apiUtil';
export const api = apiUtil;

import config from '@/config';
const {BOSS_WEB, ACCOUNT_WEB} = config.moduleUrl;

/* 白名单 */

// 批量导入
export const handleImport = `${BOSS_WEB}/boss/config/whitelist/add.do`;
// 列表查询
export const queryWhiteList = `${BOSS_WEB}/boss/config/whitelist/query.do`;
// 修改白名单状态 禁用、启用
export const handleStatus = `${BOSS_WEB}/boss/config/whitelist/update.do`;
// 下载模板
export const handleExport = `${BOSS_WEB}/boss/config/whitelist/export.do`;


/* 用户账户 */

// 获取报表名称
export const queryReportName = `${ACCOUNT_WEB}/report/getBalanceReportName`;
// 下载报表
export const handleExportReport = `${ACCOUNT_WEB}/report/downloadBalanceReport`;
