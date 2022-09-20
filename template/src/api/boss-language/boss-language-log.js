import { curl } from "../bizApiUtils";
import config from '@/config';
const { NODE_COMPOSITION } = config.moduleUrl

//  获取国际化操作记录分页管理
export const bossLanguageLogList = (params, config) => curl(params, `${NODE_COMPOSITION}/boss-language-log/list.do`, config);