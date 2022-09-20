
// 本地业务常量
export default  {
	// 用户状态
    user_status: [
        {
            name: '正常',
            code: '01'
        },
        {
            name: '黑名单',
            code: '02'
        },
        {
            name: '冻结',
            code: '03'
        },
    ],
    user_status_func: {
        '01': '正常',
        '02': '黑名单',
        '03': '冻结',
    },
    // 用户活跃类型
    user_rank: [
        {
            name: '优质',
            code: '01'
        },
        {
            name: '活跃',
            code: '02'
        },
        {
            name: '沉默',
            code: '03'
        },
        {
            name: '流失',
            code: '04'
        }
    ],
    user_rank_func: {
        '01': '优质',
        '02': '活跃',
        '03': '沉默',
        '04': '流失',
    },
    // 账户类型
    account_type: [
        {
            name: '美元账户',
            code: '01'
        },
        {
            name: '瑞尔账户',
            code: '02'
        }
    ],
    // 货币类型
    coin_type: [
        {
            name: '美元',
            code: '01'
        },
        {
            name: '瑞尔',
            code: '02'
        }
    ],
    coin_type_func: {
        '01': '美元',
        '02': '瑞尔'
    },
    // 收款方类型
    remit_type: [
        {
            name: '个人用户',
            code: '01'
        },
        {
            name: '个人商户',
            code: '02'
        },
        {
            name: '企业商户',
            code: '03'
        }
    ],
    // 商户状态
    merchant_status: [
        {
            name: '未送审',
            code: 'WAIT_VERIFY'
        },
        {
            name: '审核中',
            code: 'VERIFYING'
        },
        {
            name: '审核通过',
            code: 'VERIFY_SUCCESS'
        },
        {
            name: '审核不通过',
            code: 'VERIFY_REJECT'
        },
        {
            name: '已关闭',
            code: 'CLOSED'
        }
    ],
    // 商户审核状态
    merchant_review: {
        '01': '审核通过',
        '02': '审核不通过',
        '03': '待审核',
    },
    // 交易类型
    // RECHARGE("01", "充值"), PAY("02", "消费"), TRANSFER("03", "转账"), EXCHANGE("04", "兑换"), WITHDRAWALS("05", "提现")
    trade_type: [
        {
            name: '充值',
            code: '01'
        },
        {
            name: '消费',
            code: '02'
        },
        {
            name: '转账',
            code: '03'
        },
        {
            name: '兑换',
            code: '04'
        },
        {
            name: '提现',
            code: '05'
        }
    ],
    // 交易状态
    trade_status: [
        {
            name: '创建',
            code: '01'
        },
        {
            name: '下单完成',
            code: '02'
        },
        {
            name: '支付完成',
            code: '03'
        },
        {
            name: '支付失败',
            code: '04'
        },
        {
            name: '订单取消',
            code: '05'
        }
    ],
    // 清分结果
    clear_result: [
        {
            name: '未清分',
            code: '01'
        },
        {
            name: '清分成功',
            code: '02'
        },
        {
            name: '部分清分',
            code: '03'
        }
    ], 
    // 清分状态
    clear_state: [
        {
            name: '清分开始',
            code: '01'
        },
        {
            name: '清分失败',
            code: '02'
        },
        {
            name: '清分成功',
            code: '03'
        },
        {
            name: '清分异常',
            code: '04'
        }
    ],
    // 结算结果
    balance_result: [
        {
            name: '结算成功',
            code: '01'
        },
        {
            name: '部分结算',
            code: '02'
        },
        {
            name: '未结算',
            code: '03'
        },
    ], 
    // 结算状态
    balance_status: [
        {
            name: '结算成功',
            code: '02'
        },
        {
            name: '结算失败',
            code: '03'
        }
    ],
    // 资金方向
    capital_direction: [
        {
            name: '充值',
            code: '1'
        },
        {
            name: '提现',
            code: '2'
        }
    ],
}
