
import apiUtil from '@/api/apiUtil'
import config from '@/config'
const { BOSS_WEB, MERCHANT_BOSS_WEB } = config.moduleUrl

export const api = apiUtil

export const searchCmsDataResource = params => api(params, `${BOSS_WEB}/cms/dataResource/searchCmsDataResource`)
