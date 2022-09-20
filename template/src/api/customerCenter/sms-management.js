import { curl } from "../bizApiUtils";
import config from '@/config';
const { USER_WEB } = config.moduleUrl

//  验证码列表查询接口
export const verifyCodeList = (params, config) => curl(params, `${USER_WEB}/verify/code/list.do`, config);

//  验证码详情查询接口
export const verifyCodeDetail = (params, config) => curl(params, `${USER_WEB}/verify/code/detail.do`, config);

//  重发验证码短信
export const verifyCodeResend = (params, config) => curl(params, `${USER_WEB}/verify/code/resend.do`, config);