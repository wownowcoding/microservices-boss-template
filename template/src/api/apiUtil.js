import {
    post_func,
    mock_func_hbf
} from '@/utils/axios'

/**
 * @description 请求入口mock开关中间件
 * @param {Object} params 请求参数
 * @param {String} url 请求的url
 * @param {object} config 请求入口的配置<br/>
 * @param {boolean} config.mock
 *  mock false 是否开启mock
 */

const api = (params, url, config = {
    mock: false
}) => {
    const {
        mock
    } = config
    let func = !mock ? post_func : mock_func_hbf
    return func(params, url, config);
}

export default api
