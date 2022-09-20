export const membershipCardQueryList = function (vm) {
    return [
        {
            type: 'text',
            label: vm.$t('settle.merchantNo'),
            key: 'merchantNo'
        },
        {
            type: 'text',
            label: vm.$t('settle.merchantName'),
            key: 'merchantName'
        },
        {
            type: 'dateRange',
            label: vm.$t('risk.createTime'),
            startDate: 'createStartDate',
            endDate: 'createEndDate',
            format: 'dd/MM/yyyy'
        }
    ]
}
export const membershipCardQueryInfoList = function (vm) {
    return [
        {
            type: 'text',
            label: vm.$t('settle.merchantNo'),
            key: 'merchantNo',
            value: vm.$route.query.merchantNo,
            disabled: true
        },
        {
            type: 'text',
            label: vm.$t('settle.merchantName'),
            key: 'merchantName',
            value: vm.$route.query.merchantName,
            disabled: true
        },
        {
            type: 'text',
            label: vm.$t('businessMarketing.user_name'),
            key: 'userName'
        },
        {
            type: 'text',
            label: vm.$t('businessMarketing.user_account'),
            key: 'userPhone'
        },
        {
            type: 'text',
            label: vm.$t('businessMarketing.member_card_no'),
            key: 'cardCode'
        },
        {
            type: 'dateRange',
            label: vm.$t('businessMarketing.obtain_time'),
            startDate: 'receiveTimeStart',
            endDate: 'receiveTimeEnd',
            format: 'dd/MM/yyyy'
        }
    ]
}
export const membershipCardTableList = function (vm, detailRole, editRole, deleteRole, infoRole) {
    return [{
        title: vm.$t('risk.createTime'),
        key: "createTime",
        minWidth: 250,
        align: 'center',
    }, {
        title: vm.$t('settle.merchantNo'),
        key: "merchantNo",
        minWidth: 250,
        align: 'center',
    }, {
        title: vm.$t('settle.merchantName'),
        key: "merchantName",
        minWidth: 250,
        align: 'center',
    }, {
        title: vm.$t('businessMarketing.member_card_name'),
        key: "name",
        minWidth: 250,
        align: 'center',
    }, {
        // 操作
        title: vm.$t("utils.operate"),
        key: "operate",
        fixed: 'right',
        minWidth: 200,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'text',
                        size: 'small'
                    },
                    style: {
                        color: 'rgb(243, 147, 34)',
                        display: detailRole ? 'inline-block' : 'none'
                    },
                    on: {
                        click: () => {
                            vm.handleCardDetail(params.row.cardNo)
                        }
                    }
                }, vm.$t('businessMarketing.details')),
                h('Button', {
                    props: {
                        type: 'text',
                        size: 'small'
                    },
                    style: {
                        color: 'rgb(243, 147, 34)',
                        display: editRole ? 'inline-block' : 'none'
                    },
                    on: {
                        click: () => {
                            vm.handleCardEdit(params.row.cardNo)
                        }
                    }
                }, vm.$t('operation.edit')),
                h('Button', {
                    props: {
                        type: 'text',
                        size: 'small'
                    },
                    style: {
                        color: 'rgb(243, 147, 34)',
                        display: deleteRole && params.row.memberNumber > 0 ? 'none' : 'inline-block'
                        // display: params.row.memberNumber === 0 ? 'inline-block' : 'none'
                    },
                    on: {
                        click: () => {
                            vm.handleCardDelete(params.row.cardNo, params.row.merchantName, params.row.name)
                        }
                    }
                }, vm.$t('operation.delete')),
                h('Button', {
                    props: {
                        type: 'text',
                        size: 'small'
                    },
                    style: {
                        color: 'rgb(243, 147, 34)',
                        display: infoRole ? 'inline-block' : 'none'
                    },
                    on: {
                        click: () => {
                            vm.handleJumpInfo(params.row.cardNo, params.row.merchantNo, params.row.merchantName)
                        }
                    }
                }, vm.$t('businessMarketing.member_info'))
            ]);
        }
    }
    ]
}
export const membershipCardTableInfoList = function (vm) {
    return [{
        title: vm.$t('businessMarketing.obtain_time'),
        key: "receiveTime",
        minWidth: 250,
        align: 'center',
    }, {
        title: vm.$t('businessMarketing.user_name'),
        key: "userName",
        minWidth: 250,
        align: 'center',
    }, {
        title: vm.$t('businessMarketing.user_account'),
        key: "userPhone",
        minWidth: 250,
        align: 'center',
    }, {
        title: vm.$t('businessMarketing.member_card_no'),
        key: "cardCode",
        minWidth: 250,
        align: 'center',
    }, {
        title: vm.$t('businessMarketing.member_gender'),
        key: "userSex",
        minWidth: 250,
        align: 'center',
        render: (h, params) => h('div', vm.userSexEnum(params.row.userSex))
    }, {
        title: vm.$t('businessMarketing.member_age'),
        key: "userAge",
        minWidth: 250,
        align: 'center',
    }, {
        title: vm.$t('businessMarketing.member_card_name'),
        key: "cardName",
        minWidth: 250,
        align: 'center',
    }, {
        title: vm.$t('businessMarketing.validity_period'),
        key: "limitDate",
        minWidth: 250,
        align: 'center',
    }
    ]
}
