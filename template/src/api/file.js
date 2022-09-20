import apiUtil from './apiUtil'
export const api = apiUtil

import config from '@/config';
const {FILE_WEB} = config.moduleUrl

export const upload = `/boss/boss-api/upload-assets` // 上传
export const download = `${FILE_WEB}/file-service/file/download.do` // 下载
