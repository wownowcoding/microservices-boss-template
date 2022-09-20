import { curl } from "../bizApiUtils";
import config from '@/config';
const { BOSS_WEB } = config.moduleUrl

//  查询当前部门和子部门（列表）
export const departmentList = (params, config) => curl(params, `${BOSS_WEB}/boss/department/list.do`, config);

//  查询当前部门和子部门（列表）
export const departmentTreeList = (params, config) => curl(params, `${BOSS_WEB}/boss/department/tree/list.do`, config);

//  创建部门
export const departmentCreate = (params, config) => curl(params, `${BOSS_WEB}/boss/department/create.do`, config);

//  编辑部门
export const departmentModify = (params, config) => curl(params, `${BOSS_WEB}/boss/department/modify.do`, config);

//  删除
export const departmentDelete = (params, config) => curl(params, `${BOSS_WEB}/boss/department/delete.do`, config);