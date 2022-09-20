import {pageWrapper, MockData} from '@/mock/mockUtil'

export const listSize = 100
export const batchListDTO = (flag = '') => {
    const currency = ['USD', 'KHR']
    return {
        settleAmt: randomNum(10, 160),
        createTime: randomNum(1567267200000, 1570000000000),
        settlementNo: randomNum(12312322, 123124123),
        merchantNo: randomNum(123123221122, 1231241232222),
        merchantName: '小花店',
        currency: currency[randomNum(0, 1)],
        depositAmt: randomNum(10, 160),
        rateValue: `${randomNum(10, 90)}%`,
        commissionAmt: randomNum(10, 160),
        settleStatus: randomNum(10, 16).toString()
    }
}

export const detailListDTO = (flag = '') => {
    return {
        currency: 'string',
        finishedTime: 'string',
        payeeName: 'string',
        payeeNo: 'string',
        payeeWorkNo: 'string',
        payingAmount: 'string',
        payingStatus: MockData.enumInt(10, 13),
        payingType: MockData.enumInt(10, 12),
        remark: 'string',
        seqNo: 0,
        wagesMonth: 'string',
    }
}
export const detailList = (() => {
    let list = []
    for (let i = 0; i < listSize; i++) {
        list.push(detailListDTO(i))
    }
    return list
})()

export const payingDetailDTO = params => {
    return {
        clearNo: 'string',
        currency: 'USD',
        operator: 'string',
        operatorTime: 'string',
        abnormalToSuccessReason: 'string',
        channelActualCount: 'string',
        clrAbnormalReason: 'string',
        channelActualTotalAmt: 12,
        channelCode: MockData.enumInt(10, 12),
        platformClearSuccessAmt: MockData.enumInt(10, 12),
        platformClearSuccessCount: MockData.enumInt(10, 12),
        platformRefundCount: MockData.enumInt(10, 12),
        platformRefundTotalAmt: MockData.enumInt(10, 12),
        clearStatus: MockData.enumInt(10, 12),
        channelPayAmt: MockData.enumInt(10, 120),
        channelPayCount: MockData.enumInt(10, 120),
        channelRefundCount: MockData.enumInt(10, 120),
        channelRefundTotalAmt: MockData.enumInt(10, 120),
        clearFinishedDate: '2019-06-03T08:42:12.294Z',
        tradeStartDate: '2019-06-03T08:42:12.294Z',
        // payingDetailList: pageWrapper(params, detailList),
        payingStatus: params.payingStatus,
        sumWages: 'string',
    }
}
export const payingDetailValidDTO = (flag = '') => {
    return {
        batchNo: 'string',
        currency: 'USD',
        merName: {
            error: true,
            value: 'string',
        },
        merNo: {
            error: true,
            value: 'string',
        },
        payingDetailList: (() => {
            return payingDetailValidList
        })(),
        payingErrorMsg: ['FILE_TEMPLATE_INCORRECT'],
        totalAmt: 'string',
        totalCount: 0,
        wagesMonth: 'string',
    }
}

const tableData = idx => {
    return {
        payeeName: {
            error: MockData.twoSwitch(),
            value: MockData.str(),
        },
        payeeNo: {
            error: MockData.twoSwitch(),
            value: MockData.twoSwitch() ? MockData.str() : '',
        },
        payeeWorkNo: MockData.str(),
        payingAmount: {
            error: MockData.twoSwitch(),
            value: MockData.str(),
        },
        payingType: {
            error: MockData.twoSwitch(),
            value: MockData.str(),
        },
        remark: MockData.str(),
        seqNo: {
            error: MockData.twoSwitch(),
            value: idx,
        },
        wagesMonth: {
            error: MockData.twoSwitch(),
            value: 1555420554202,
        },
    }
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10)
            break
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
            break
        default:
            return 0
            break
    }
}

export const payingDetailValidList = (() => {
    let list = []
    for (let i = 0; i < listSize; i++) {
        list.push(tableData(i))
    }
    return list
})()

export const batchList = (() => {
    let list = []
    for (let i = 0; i < listSize; i++) {
        list.push(batchListDTO(i))
    }
    return list
})()
