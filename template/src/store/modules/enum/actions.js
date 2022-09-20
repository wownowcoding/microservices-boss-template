import {
    api,
    getEnumByKeys
} from '@/api/utils';
export default {
    async getEnums(context, enumKeyMap) {
        let reqEnumMap = {} // 需要请求接口获取的枚举键map 例: 模块名:'枚举1,枚举2'
        const {
            commit,
            rootState
        } = context
        // 先遍历一遍看看需求枚举是否在state中缓存过,没有则加入待请求map中
        Object.keys(enumKeyMap).forEach(mdName => {
            let stateKeyList = enumKeyMap[mdName].split(',') //模块下枚举键是需要按,拆分,格式如上面描述
            // 存在该state模块才向下遍历
            if (!!rootState[mdName]) {
                stateKeyList.forEach((stateKey) => {
                    stateKey = stateKey.trim()
                    let stateVal = rootState[mdName][stateKey] // 到对应的state中判断当前枚举是否存在
                    // 如果不存在该枚举,则创建一个空数组
                    if (!!!stateVal) {
                        rootState[mdName][stateKey] = []
                    }
                    // 重新拼成 模块名:'枚举1,枚举2'
                    if (!!!rootState[mdName][stateKey].length) {
                        if (!!!reqEnumMap[mdName]) {
                            reqEnumMap[mdName] = stateKey
                        } else {
                            reqEnumMap[mdName] += "," + stateKey
                        }
                    }
                })
            }
        });

        // 通过后台获取待请求枚举后,以模块为单位挨个提交修改状态事件
        if (Object.keys(reqEnumMap).length > 0) { // 存在需要获取枚举的集
            // 因为后台的模块名与前端的模块名不一致,做个中间map用于转换
            let mdNameMap = {
                'settle': 'settle',
                'order': 'trade',
            }
            let params = {} // 提交时的参数,下面把前端的模块名转成后端的模块名
            Object.keys(reqEnumMap).forEach((mdName) => {
                let transMdName = mdNameMap[mdName] || mdName // 实际请求接口时的模块名
                params[transMdName] = reqEnumMap[mdName]
            })
            let res = await api(params, getEnumByKeys)
            if (res.rspCd == '00000') {
                //todo 这里还需把模块名转回来
                Object.keys(reqEnumMap).forEach(mdName => {
                    // TODO 找不到的模块,动态添加对应枚举
                    let transMdName = mdNameMap[mdName] || mdName // 实际请求接口时的模块名
                    let matchMdNameEnum = res.data[transMdName]
                    // 存在对应模块的EnumMap才下发到具体module去处理
                    if (!!matchMdNameEnum && Object.keys(matchMdNameEnum).length > 0) {
                        commit(mdName + '/setEnumStatus', matchMdNameEnum, {
                            root: true
                        })
                    }
                })
            }
        }
    }
}
