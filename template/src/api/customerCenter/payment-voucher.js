import apiUtil from '../apiUtil';
import { curl } from "../bizApiUtils";
export const api = apiUtil;
import config from '@/config';

export const queryMemberList = (params, config) => curl(params, `${USER_WEB}/usercenter/member/list.do`, config);
