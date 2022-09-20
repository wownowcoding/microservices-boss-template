import apiUtil from './apiUtil'
export const api = apiUtil

import config from '@/config';
const {MERCHANT_BOSS_WEB} = config.moduleUrl

export const selectExchangeRatesList = `${MERCHANT_BOSS_WEB}/product/exchangeRate/query/history/list.do`
export const addExchangeRates = `${MERCHANT_BOSS_WEB}/product/exchangeRate/save.do`
export const selectExchangeRatesInfo = `${MERCHANT_BOSS_WEB}/product/exchangeRate/query.do`
