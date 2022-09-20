import Qs from 'qs'
import { pageWrapper, resWrapper, MockData } from '@/mock/mockUtil'
import {
    SETTLE_AUDIT_TABEL_LIST,
    GET_CLEAR_DETAIL_DATA
} from '@/services/settle'
import mock from '@/mock'
import { batchList, payingDetailDTO, payingDetailValidDTO } from './DTO'

//============================== apiMock
/**
 * return 商户结算清结算审核列表查询
 * */
mock.onPost('/boss_settle/boss/settle/commisson/pending/bill/list.do').reply(config => {
    let params = Qs.parse(config.data)
    let data = pageWrapper(params, batchList)
    // console.log(batchList, data)
    return [200, resWrapper(data)]
})

// 清结算管理-清分管理-详情查询接口
// mock.onPost(GET_CLEAR_DETAIL_DATA).reply(config => {
//     let params = Qs.parse(config.data)
//     return [200, resWrapper(payingDetailDTO(params))]
// })
// 上传校验代发名单
mock.onPost('mer_wages_upload').reply(config => {
    return [200, resWrapper(payingDetailValidDTO())]
})

// mock.onPost(addExchangeRates).reply(config => {
//     let data = {}
//     return [200, resWrapper(data)]
// })
// mock.onPost(selectExchangeRatesInfo).reply(config => {
//     let params = Qs.parse(config.data)
//     let data = {
//         createTime: moment()
//             .toDate()
//             .getTime(),
//         exchangeDate: moment()
//             .toDate()
//             .getTime(),
//         bankSugPrice: Math.round(Math.random() * 100 + 4e3),
//         khrBuyUsd: Math.round(Math.random() * 100 + 4e3),
//         usdBuyKhr: Math.round(Math.random() * 100 + 4e3),
//     }
//     return [200, resWrapper(data)]
// })

//============================== rolePart
export const rolePartMock = {
    merchantPayment_salaryAgency_query: true,
    merchantPayment_salaryAgency_download: true,
    merchantPayment_salaryAgency_upload: true,
    merchantPayment_salaryAgency_detail: true,
    merchantPayment_salaryAgency_export: true,
    merchantPayment_salaryAgency_confirm: true,
}

//============================== enumMork
export const enumMork = {
    payingStatus: [
        { code: '10', message: '全部' },
        { code: '11', message: '处理中' },
        { code: '12', message: '付款成功' },
        { code: '13', message: '付款失败' },
    ],
}
