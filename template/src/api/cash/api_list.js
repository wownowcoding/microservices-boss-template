export default {
    "运营中心(operation)": {
        "网点管理(branch)": {
            "网点列表(branch_list)": {
                "list": {
                    "url": "/cash/boss/branch/list.do",
                    "req": {},
                    "res": {
                        list: [{
                            "addressFull": "string",
                            "branchCode": "string",
                            "branchName": "string",
                            "businessTimeEnd": "string",
                            "businessTimeStart": "string",
                            "chargePersonName": "string",
                            "chargePersonPhone": "string",
                            "phone": "string",
                            "status": "string"
                        }]
                    },
                },
                "add": {
                    "url": "/cash/boss/branch/add.do",
                    "req": {
                        "branchCode": "string",
                        "branchName": "string",
                        "phone": "string",
                        "businessTimeEnd": "string",
                        "businessTimeStart": "string",
                        "chargePersonCode": "string",
                        "chargePersonName": "string",
                        "chargePersonPhone": "string",
                        "provice": "string",
                        "city": "string",
                        "area": "string",
                        "addressDetail": "string",
                    },
                    "res": {},
                },
                "edit": {
                    "url": "/cash/boss/branch/edit.do",
                    "req": {
                        "branchCode": "string",
                        "branchName": "string",
                        "phone": "string",
                        "businessTimeEnd": "string",
                        "businessTimeStart": "string",
                        "chargePersonCode": "string",
                        "chargePersonName": "string",
                        "chargePersonPhone": "string",
                        "provice": "string",
                        "city": "string",
                        "area": "string",
                        "addressDetail": "string",
                    },
                    "res": {},
                },
                "detail": {
                    "url": "/cash/boss/branch/detail.do",
                    "req": {},
                    "res": {
                        "branchCode": "string",
                        "branchName": "string",
                        "phone": "string",
                        "businessTimeEnd": "string",
                        "businessTimeStart": "string",
                        "chargePersonCode": "string",
                        "chargePersonName": "string",
                        "chargePersonPhone": "string",
                        "provice": "string",
                        "city": "string",
                        "area": "string",
                        "addressDetail": "string",
                    },
                },
                "open": {
                    "url": "/cash/boss/branch/open.do",
                    "req": {
                        "branchCode": "string"
                    },
                    "res": {},
                },
                "close": {
                    "url": "/cash/boss/branch/close.do",
                    "req": {
                        "branchCode": "string"
                    },
                    "res": {},
                },
            },
            "柜员列表(counter_list)": {
                "add": {
                    "url": "/cash/boss/counter/add.do",
                    "req": {
                        "counterCode": "string",
                        "chargePersonCode": "string",
                        "chargePersonName": "string",
                        "counterFamilyName": "string",
                        "counterGivenName": "string",
                        "provice": "string",
                        "city": "string",
                        "area": "string",
                        "addressDetail": "string",
                        "identifyCode": "string",
                        "identifyImageUrl": ["string"],
                        "operatorCode": "string",
                        "phone": "string",
                        "chargePersonName": "string",
                        "chargePersonPhone": "string",
                        "remark": "string",
                        "role": "string",
                        "terminalCode": "string"
                    },
                    "res": {},
                },
                "edit": {
                    "url": "/cash/boss/counter/edit.do",
                    "req": {
                        "counterCode": "string",
                        "chargePersonCode": "string",
                        "chargePersonName": "string",
                        "counterFamilyName": "string",
                        "counterGivenName": "string",
                        "provice": "string",
                        "city": "string",
                        "area": "string",
                        "addressDetail": "string",
                        "identifyCode": "string",
                        "identifyImageUrl": ["string"],
                        "operatorCode": "string",
                        "phone": "string",
                        "chargePersonName": "string",
                        "chargePersonPhone": "string",
                        "remark": "string",
                        "role": "string",
                        "terminalCode": "string"
                    },
                    "res": {},
                },
                "detail": {
                    "url": "/cash/boss/counter/detail.do",
                    "req": {},
                    "res": {
                        "counterCode": "string",
                        "chargePersonCode": "string",
                        "chargePersonName": "string",
                        "counterFamilyName": "string",
                        "counterGivenName": "string",
                        "provice": "string",
                        "city": "string",
                        "area": "string",
                        "addressDetail": "string",
                        "addressFull": "string",
                        "identifyCode": "string",
                        "identifyImageUrl": ["string"],
                        "relationalPersonName": "string",
                        "relationalPersonPhone": "string",
                        "operatorCode": "string",
                        "phone": "string",
                        "remark": "string",
                        "role": "string",
                        "terminalCode": "string",
                        "operateLogList": [
                            {
                                "counterCode": "string",
                                "operate": "CREATE",
                                "operateTime": "2018-09-06 08:25:52",
                                "operatorCode": "string",
                                "operatorName": "string",
                                "status": "SUCCESS"
                              }
                        ]
                    },
                },
                "list": {
                    "url": "/cash/boss/counter/list.do",
                    "req": {},
                    "res": {
                        list: [{
                            "counterCode": "string",
                            "counterName": "string",
                            "chargePersonCode": "string",
                            "chargePersonName": "string",
                            "provice": "string",
                            "city": "string",
                            "area": "string",
                            "addressDetail": "string",
                            "identifyCode": "string",
                            "identifyImageUrl": ["string"],
                            "operatorCode": "string",
                            "phone": "string",
                            "remark": "string",
                            "role": "string",
                            "terminalCode": "string"
                        }]
                    },
                },
                "freeze": {
                    "url": "/cash/boss/counter/freeze.do",
                    "req": {
                        "counterCode": "string"
                    },
                    "res": {},
                },
                "unfreeze": {
                    "url": "/cash/boss/counter/unfreeze.do",
                    "req": {
                        "counterCode": "string"
                    },
                    "res": {},
                },
                "resetsecuritycode": {
                    "url": "/cash/boss/counter/resetsecuritycode.do",
                    "req": {
                        "counterCode": "string"
                    },
                    "res": {},
                },
                "getoperatorcounter": {
                    "url": "/cash/boss/counter/getoperatorcounter.do",
                    "req": {
                        "operatorCode": "string"
                    },
                    "res": {},
                },
            },
            "柜员排班(counter_schedule)": {
                "list": {
                    "url": "operation/branch/counter_schedule/list.do",
                    "req": {

                    },
                    "res": {},
                },
                "add": {
                    "url": "operation/branch/counter_schedule/add.do",
                    "req": {},
                    "res": {},
                },
                "edit": {
                    "url": "operation/branch/counter_schedule/edit.do",
                    "req": {},
                    "res": {},
                },
                "delete": {
                    "url": "operation/branch/counter_schedule/delete.do",
                    "req": {},
                    "res": {},
                },
            },
            "签到签退记录(sign_list)": {
                "list": {
                    "url": "/cash/boss/work/list.do",
                    "req": {},
                    "res": {},
                },
                "sign_out": {
                    "url": "/cash/boss/work/forcesignout.do",
                    "req": {
                        "counterCode": "string"
                      },
                    "res": {},
                },
            },
        },
    },
    "财务中心(financial)": {
        "订单管理(order)": {
            "充值订单(deposit_order)": {
                "list": {
                    "url": "/order/deposit/list.do",
                    "req": {
                        "outSourceCode": "string",
                        "currency": "USD",
                        "outSourceNo": "string",
                        "orderStatus": "WAIT_PAY",
                        "pageNo": 0,
                        "pageSize": 0,
                        "userMp": "string",
                        "timeEnd": "string",
                        "timeStart": "string"
                    },
                    "res": {
                        list: [{
                            "bizType": 0,
                            "outSourceCode": "string",
                            "createTime": "string",
                            "currency": "string",
                            "data": {},
                            "outSourceNo": "string",
                            "orderAmt": "string",
                            "orderStatus": 0,
                            "pageNo": 0,
                            "pageSize": 0,
                            "userMp": "string",
                            "version": "string"
                        }]
                    },
                },
                "detail": {
                    "url": "/order/deposit/detail.do",
                    "req": {
                        "orderNo": "string"
                    },
                    "res": {
                        "data": {
                            "bizType": 0,
                            "outSourceCode": "string",
                            "createTime": "string",
                            "currency": "string",
                            "data": {},
                            "discountAmt": "string",
                            "outSourceNo": "string",
                            "orderAmt": "string",
                            "orderStatus": 0,
                            "pageNo": 0,
                            "pageSize": 0,
                            "payeeAmt": "string",
                            "userMp": "string",
                            "serviceAmt": "string",
                            "tmFinished": "string",
                            "version": "string"
                        },
                        "responseTm": "string",
                        "rspCd": "string",
                        "rspInf": "string",
                        "rspType": 0,
                        "v": "string"
                    },
                },
            },
            "提现订单(withdraw_order)": {
                "list": {
                    "url": "financial/order/withdraw_order/list.do",
                    "req": {},
                    "res": {},
                },
                "detail": {
                    "url": "financial/order/withdraw_order/detail.do",
                    "req": {},
                    "res": {},
                },
            },
        },
        "现金管理(cash)": {
            "柜员现金管理(counter_cash)": {
                "list": {
                    "url": "financial/cash/counter_cash/list.do",
                    "req": {},
                    "res": {},
                },
                "confirm": {
                    "url": "financial/cash/counter_cash/confirm.do",
                    "req": {},
                    "res": {},
                },
                "detail": {
                    "url": "financial/cash/counter_cash/detail.do",
                    "req": {},
                    "res": {},
                },
            },
        },
        "网点清结算管理(branch_settle)": {
            "网点日账单查询(branch_daily_settle)": {
                "list": {
                    "url": "financial/branch_settle/branch_daily_settle/list.do",
                    "req": {},
                    "res": {},
                },
                "download": {
                    "url": "financial/branch_settle/branch_daily_settle/download.do",
                    "req": {},
                    "res": {},
                },
            },
            "网点对账差错列表(branch_reconciliation)": {
                "list": {
                    "url": "financial/branch_settle/branch_reconciliation/list.do",
                    "req": {},
                    "res": {},
                }
            },
            "网点未结算查询(branch_pending_settle)": {
                "list": {
                    "url": "financial/branch_settle/branch_pending_settle/list.do",
                    "req": {},
                    "res": {},
                },
                "download": {
                    "url": "financial/branch_settle/branch_pending_settle/download.do",
                    "req": {},
                    "res": {},
                },
                "audit": {
                    "url": "financial/branch_settle/branch_pending_settle/audit.do",
                    "req": {},
                    "res": {},
                },
                "payout": {
                    "url": "financial/branch_settle/branch_pending_settle/payout.do",
                    "req": {},
                    "res": {},
                },
                "detail": {
                    "url": "financial/branch_settle/branch_pending_settle/detail.do",
                    "req": {},
                    "res": {},
                },
            },
            "网点已结算查询(branch_closed_settle)": {
                "list": {
                    "url": "financial/branch_settle/branch_closed_settle/list.do",
                    "req": {},
                    "res": {},
                },
                "download": {
                    "url": "financial/branch_settle/branch_closed_settle/download.do",
                    "req": {},
                    "res": {},
                },
                "detail": {
                    "url": "financial/branch_settle/branch_closed_settle/detail.do",
                    "req": {},
                    "res": {},
                },
            },
        },
    },
    "风控中心(risk)": {
        "规则中心(rule)": {
            "网点风控规则(branch_risk_rule)": {
                "list": {
                    "url": "risk/rule/branch_risk_rule/list.do",
                    "req": {},
                    "res": {},
                },
                "detail": {
                    "url": "risk/rule/branch_risk_rule/detail.do",
                    "req": {},
                    "res": {},
                },
                "add": {
                    "url": "risk/rule/branch_risk_rule/add.do",
                    "req": {},
                    "res": {},
                },
                "edit": {
                    "url": "risk/rule/branch_risk_rule/edit.do",
                    "req": {},
                    "res": {},
                },
                "toggle": {
                    "url": "risk/rule/branch_risk_rule/toggle.do",
                    "req": {},
                    "res": {},
                },
            },
            "柜员风控规则(counter_risk_rule)": {
                "list": {
                    "url": "risk/rule/counter_risk_rule/list.do",
                    "req": {},
                    "res": {},
                },
                "detail": {
                    "url": "risk/rule/counter_risk_rule/detail.do",
                    "req": {},
                    "res": {},
                },
                "edit": {
                    "url": "risk/rule/counter_risk_rule/edit.do",
                    "req": {},
                    "res": {},
                },
                "toggle": {
                    "url": "risk/rule/counter_risk_rule/toggle.do",
                    "req": {},
                    "res": {},
                },
                "add": {
                    "url": "risk/rule/counter_risk_rule/add.do",
                    "req": {},
                    "res": {},
                },
            },
            "用户风控规则(user_risk_rule)": {
                "list": {
                    "url": "risk/rule/user_risk_rule/list.do",
                    "req": {},
                    "res": {},
                },
                "detail": {
                    "url": "risk/rule/user_risk_rule/detail.do",
                    "req": {},
                    "res": {},
                },
                "add": {
                    "url": "risk/rule/user_risk_rule/add.do",
                    "req": {},
                    "res": {},
                },
                "edit": {
                    "url": "risk/rule/user_risk_rule/edit.do",
                    "req": {},
                    "res": {},
                },
                "toggle": {
                    "url": "risk/rule/user_risk_rule/toggle.do",
                    "req": {},
                    "res": {},
                },
            },
        },
        "风险预警(warning)": {
            "柜员风险数据(counter_warning_list)": {
                "list": {
                    "url": "risk/warning/counter_warning_list/list.do",
                    "req": {},
                    "res": {},
                }
            },
            "用户风险数据(user_warning_list)": {
                "list": {
                    "url": "risk/warning/user_warning_list/list.do",
                    "req": {},
                    "res": {},
                }
            },
        }
    },
}
