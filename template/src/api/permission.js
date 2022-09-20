/*
 * @Description: 权限相关Api
 * @Author: 管铭钊
 * @Date: 2019/11/11
 */
import config from "@/config";

const { BOSS_WEB } = config.moduleUrl

const getBossWebFullUrl = (url) => `${BOSS_WEB}${url}`
export default {
    getMainMenu: getBossWebFullUrl('/boss/system/menu/first/list.do'),
    getSubMenu: getBossWebFullUrl('/boss/system/menu/child/list.do'),
}
