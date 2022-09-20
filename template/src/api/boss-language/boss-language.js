import { curl } from "../bizApiUtils";
import config from '@/config';
const { NODE_COMPOSITION } = config.moduleUrl

//  获取所有国际化
export const bossLanguageAllList = (params, config) => curl(params, `${NODE_COMPOSITION}/boss-language/all/list.do`, config);
//  国际化分页管理
export const bossLanguageListUrl = `${NODE_COMPOSITION}/boss-language/list.do`;
export const bossLanguageList = (params, config) => curl(params, bossLanguageListUrl, config);
//  批量插入国际化
export const bossLanguageBulkInsert = (params, config) => curl(params, `${NODE_COMPOSITION}/boss-language/bulk-insert.do`, config);
//  更新国际化
export const bossLanguageUpdate = (params, config) => curl(params, `${NODE_COMPOSITION}/boss-language/update.do`, config);
//  批量更新相同值的国际化
export const bossLanguageBulkUpdate = (params, config) => curl(params, `${NODE_COMPOSITION}/boss-language/bulk-update.do`, config);
//  批量导入修改
export const bossLanguageBulkImport = (params, config) => curl(params, `${NODE_COMPOSITION}/boss-language/bulk-import.do`, config);
//  修改历史回滚
export const bossLanguageGoBackHistory = (params, config) => curl(params, `${NODE_COMPOSITION}/boss-language/go-back-history.do`, config);
//  批量导入修改回滚
export const bossLanguageGoBackBulkImportHistory = (params, config) => curl(params, `${NODE_COMPOSITION}/boss-language/go-back-bulk-import-history.do`, config);
//  国际化开关
export const compositionOtherConfigOperateLanguageSwitch = (params, config) => curl(params, `${NODE_COMPOSITION}/composition-other/config/operate-language-switch.do`, config);