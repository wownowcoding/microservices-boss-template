import api from '@/api/apiUtil'
import postDownload from '@/components/DownloadLink/postDownload'
import {urlArray, exportUrlArray} from './url'
function selectUrl (params = {}, funcName = '', isBlockException) {
    funcName= funcName.toUpperCase()
    const url = Object.values(urlArray.filter(item => item.hasOwnProperty(funcName))[0])[0]
    return api(params, url, isBlockException)
}
function selectExportUrl (params = {}, funcName = '', fileName = '') {
    funcName= funcName.toUpperCase()
    const url = Object.values(exportUrlArray.filter(item => item.hasOwnProperty(funcName))[0])[0]
    return postDownload(url, params, fileName)
}

export function postAjaxFunc (params, funcName, isBlockException) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data, rspCd, rspInf } = await selectUrl(params, funcName, isBlockException)
            if (rspCd === '00000') {
                resolve(data)
            } else {
                reject(rspInf)
            }
        } catch (e) {
            reject(e)
        }
    })
}

export function exportExcelFunc (params, funcName, fileName) {
    return new Promise(async (resolve, reject) => {
        try {
            await selectExportUrl(params, funcName, fileName)
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
