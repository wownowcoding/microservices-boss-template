/*
 * @Description:
 * @Author: 黄博方
 * @Date: 2019-08-08 13:57:02
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-11-27 15:50:49
 */
export default {
    // 导航栏
    title: {

        add: '新增',
        edit: '编辑',
        detail: '详情',
        create: '创建',

        // 菜单开始
        home: '首页',

        personal: '个人中心',
        change_pass: '修改密码',

        user: '用户管理',
        user_query: '用户信息',
        white_list: '用户白名单',
        user_account: '用户账户',
        real_name_audit: '实名审核',

        system: '系统管理',
        operators: '操作员管理',
        menus: '菜单管理',
        roles: '角色管理',
        logs: '操作日志',
        international: '国际化管理',

        merchant: '商户管理',
        create_merchant: '创建商户',
        merchant_review: '商户审核',
        merchant_list: '商户列表',
        black_list: '黑名单商户',
        merchant_apply: '商户申请',

        store: '门店管理',
        store_apply: '门店申请',
        store_audit: '门店审核',
        store_list: '门店列表',

        adManage: '广告管理',
        adManage_promotion: '发现页管理',
        adManage_banner: 'banner管理',
        adManage_promotionBusiness: '发现页分类管理',

        activity: '营销活动',
        activity_list: '活动列表',
        activity_apply_list: '活动申请列表',
        activity_audit_list: '活动审核列表',

        message: '消息管理',
        news_push: '消息推送',
        sms_template: '短信模板',
        message_gateway: '短信网关',
        message_record: '短信查询',

        query: '订单查询',
        trade_query: '交易查询',
        bussiness_query: '业务查询',
        refund_query: '退款查询',
        recharge_order: '民生业务订单',
        recharge_channel: '业务渠道流水',
        cashOrder: '出入金订单',

        branch: '网点管理',
        branch_list: '网点列表',
        counter_list: '柜员列表',
        counter_schedule: '网点排班',
        sign_list: '签到签退记录',

        cash_order: '出入金业务订单',
        deposit_order: '充值订单',
        withdraw_order: '提现订单',

        cash: '现金管理',
        counter_cash: '柜员现金管理',
        financial_receipt: '财务收款确认',

        card_manage: '充值卡管理',
        makecard: '制卡',
        batch_manage: '批次管理',
        card_list: '卡管理',
        salesManage: '销售管理',

        risk: '交易风控规则',
        risk_list: '商户风控规则',
        risk_integrate: '聚合支付风控规则',
        risk_integrate_global_detail: '全局风控规则详情',
        risk_integrate_global_edit: '全局风控规则编辑',
        risk_integrate_single_detail: '单商户风控规则详情',
        risk_integrate_single_edit: '单商户风控规则编辑',
        risk_integrate_single_add: '单商户风控规则新增',

        cash_rule: '出入金风控规则',
        counter_risk_rule: '柜员风控规则',
        branch_risk_rule: '网点风控规则',
        user_risk_rule: '用户风控规则',

        cash_warning: '出入金风险预警',
        user_warning_list: '用户风险数据',
        counter_warning_list: '柜员风险数据',

        cashSettle: '网点清结算管理',
        cashSettle_pendingProduce: '申请结算单',
        cashSettle_pendingHandle: '待处理结算单',
        cashSettle_completed: '已完成结算单',

        settle: '商户清结算',
        settle_audit: '商户清结算审核',
        fin_audit: '商户结算财务审核',
        channel_advance: '渠道垫资管理',
        out_audit: '商户结算出款审核',
        clear: '清分管理',
        settle_settleOrder: '商户结算订单',
        settle_error: '对账差错单',

        merchantPayment: '企业付款',
        salaryAgency: '企业工资代发',
        rechargeAudit: '账户充值审核',
        rechargeApply: '账户充值列表',
        rechargeAccount: '付款账户列表',

        report: '报表管理',
        report_query: '报表查询',
        recharge_commission: '业务报表',

        manual_adjustment: '手工调账',
        manual_adjustment_record: '手工调账录入',
        manual_adjustment_audit: '手工调账审核',
        capital_allocation: '资金划拨',

        app_config_center: 'App配置中心',
        version_config: '版本管理',
        dictionary_management: '字典管理',
        King_Kong: '金刚区管理',
        bottomNav: '底部导航管理',
        bottomNav_add: '底部导航功能入口',
        bottomNav_detail: '底部导航功能详情',
        King_Kong_add: '功能入口',
        King_Kong_detail: '功能详情',
        menu_map: '地图管理',

        product: '产品管理',
        service_charge: '手续费管理',
        contract_template: '合同模板管理',
        solution: '解决方案',
        weekday: '工作日管理',
        exchange_rates: '汇率管理',

        agreement: '合同管理',
        merAgreement: '商户合同',
        merAgreement_edit: '编辑合同',
        merAgreement_add: '新增协议',
        merAgreement_detail: '合同详情',
        merAgreement_serviceAdd: '商户合同新增产品',

        appMgmt: '应用管理',
        appList: '应用列表',
        appCreate: '创建应用',
        appAudit: '应用审核',

        agent_deposit_cash: '代理入金应收管理',
        store_cash: '门店现金监控',
        store_receipt: '门店收款单管理',
        merchant_receipt: '商户应收管理',

        // 菜单结束
        merchant_detail: '商户详情',
        merchant_info: '商户及合同管理',
        merchant_edit: '商户审核重新编辑',
        merchant_audit_detail: '商户审核详情',
        query_statistics: '订单查询',
        receipt_bill: '商户收款日账单',
        receivables_settle_bill: '商户收款结算单',
        reservation_statement: '商户收款预约结算单',
        merchant_config: '商户配置',
        poundage_add: '添加手续费',
        poundage_edit: '编辑手续费',
        poundage_detail: '查看手续费',
        contract_add: '添加合同模板',
        contract_edit: '编辑合同模板',
        contract_detail: '查看合同模板',
        solution_add: '添加解决方案',
        solution_edit: '编辑解决方案',
        solution_detail: '方案详情',
        risk_setup: '风控规则设置',
        risk_audit: '风控规则审核',
        risk_detail: '商户风控规则详情',
        risk_change: '商户风控规则修改',
        trade: '交易管理',
        order_query: '订单查询',

        balance: '结算管理',
        capital: '资金管理',
        capital_handle: '资金处理',
        capital_query: '资金查询',
        params: '参数管理',
        rate: '汇率设置',

        analysis: '用户分析指标设定',
        user_base_info: '用户基本信息',
        account_flow_record: '帐户流水记录',

        settle_wrong_list: '商户对账差错列表',

        settle_audit_detail: '商户清结算审核详情',
        fin_audit_detail: '商户结算财务审核详情',
        out_audit_detail: '商户结算出款审核详情',
        report_manager: '报表管理',

        capital_allocation_detail: '资金划拨详情',
        capital_allocation_add: '资金划拨新增',
        capital_allocation_audit: '资金划拨审核',
        tradeQueryDetail: '交易查询详情',
        // =================== 缺失国际化 ===========
        settle_clearing: '渠道清分管理',

        cashOrder_detail: '出入金订单详情',

        account_statement: '商户对账单',

        refund_detail: '退款详情',

        real_name_audit_detail: '实名详情审核',

        card_manage_detail: '充值卡详情',
        batch_manage_detail: '批次详情',
        salesManage_audit: '销售审核',
        salesManage_detail: '销售详情',
        salesManage_apply: '售卡申请',

        version_management_detail: '版本管理详情',
        version_management_editor: '版本管理编辑',
        version_management_add: '新增版本',
        menu_map_edit: '地图编辑',
        menu_map_add: '地图新增',
        menu_map_detail: '地图详情',

        appDetail: '应用详情',

        adManage_banner_detail: 'banner详情',
        adManage_banner_add: 'banner新增',
        adManage_banner_edit: 'banner修改',
        adManage_promotion_detail: '发现页详情',
        adManage_promotion_add: '发现页新增',
        adManage_promotion_edit: '发现页编辑',
        adManage_promotionBusiness_detail: '发现页分类详情',

        activity_add: '新增活动',
        activity_edit: '活动编辑',
        activity_detail: '活动详情',

        salaryAgency_detail: '工资代发明细',
        salaryAgency_upload: '上传代发名单',
        rechargeAccount_detail: '付款账户详情',
        rechargeApply_detail: '账户充值详情',
        rechargeApply_add: '账户充值申请',
        rechargeAudit_detail: '账户充值审核详情',

        // cash
        branch_add: '新增网点',
        branch_edit: '编辑网点',
        branch_detail: '网点详情',
        counter_add: '新增柜员',
        counter_edit: '编辑柜员',
        counter_detail: '柜员详情',
        counter_schedule_detail: '网点排班详情',

        deposit_order_detail: '充值订单详情',
        withdraw_order_detail: '提现订单详情',

        counter_cash_detail: '柜员现金详情',
        counter_cash_confirm: '柜员现金确认金额',
        financial_receipt_confirm: '财务收款确认金额',
        financial_receipt_detail: '财务收款确认详情',

        cashSettle_pendingProduceDetail: '待生成结算单详情',
        cashSettle_completedDetail: '已完成结算单详情',
        cashSettle_pendingHandleDetail: '待处理结算单详情',
        cashSettle_pendingHandleClearAudit: '待处理结算单清分审核',
        cashSettle_pendingHandleFinanceAudit: '待处理结算单清分审核',
        cashSettle_pendingHandlePayAudit: '待处理结算单财务打款确认',

        branch_risk_rule_add: '新增网点风控规则',
        branch_risk_rule_edit: '编辑网点风控规则',
        branch_risk_rule_detail: '网点风控规则详情',
        counter_risk_rule_add: '新增柜员风控规则',
        counter_risk_rule_edit: '编辑柜员风控规则',
        counter_risk_rule_detail: '柜员风控规则详情',
        user_risk_rule_add: '新增用户风控规则',
        user_risk_rule_edit: '编辑用户风控规则',
        user_risk_rule_detail: '用户风控规则详情',

        // 平台营销
        marketing: '平台营销',
        regularEventList: '常规活动列表',
        regularEventRequest: '常规活动申请',
        regularEventReview: '常规活动审核',
        vipayCoupon: '平台优惠券',
        distributeCoupon: '活动发放',

        // 特价商品
        bargain: '特价商品',
        bargainCommodity: '商品管理',
        commodityAdd: '新增商品',
        commodityEdit: '编辑商品',
        codeTracking: '码跟踪',
        orderList: '订单列表',
        orderDetail: '订单详情',
        codeTrackingDetail: '码详情',

        // 商户营销
        businessMarketing: '商户营销',
        businessMarketing_membershipCard: '会员卡管理',
        businessMarketing_coupon: '商户优惠券',
        businessMarketing_distribute: '优惠券发放',
        businessMarketing_track: '优惠券跟踪',

        store_apply_add: '创建门店',
        store_apply_process: '重新编辑',
        store_apply_detail: '申请详情',
        store_audit_process: '审核处理',
        store_audit_detail: '审核详情',
        store_list_edit: '门店编辑',
        store_list_detail: '门店详情',

        store_tag: "标签管理",
        store_tag_detail: "详情",
        store_tag_serviceDetail: "门店服务详情",

        merchant_before_created_edit: '商户入网前编辑',
        merchant_modify: '商户编辑',
        edit: '编辑',
        rate_adjustment: '费率调整',
        store_info: '门店信息',
        store_info_detail: '门店信息详情',

        store_receipt_payee: '收款人管理',
        store_receipt_detail: '收款单详情',
        store_receipt_audit: '财务审核',

        merchant_receipt_confirm_gathering: '确认收款',
        merchant_receipt_detail: '应收单详情',
        // 产品开通
        subscribe: '产品开通',
        subscribe_edit: '新增产品',
        subscribe_detail: '产品开通详情',
        // 终端管理
        terminal: '终端管理',
        terminal_merchant: '商户设备',
        terminal_pos: '出入金POS',
        terminal_merchant_detail: '详情',
        terminal_merchant_add: '添加设备',
        terminal_merchant_edit: '编辑设备',
        storeBusinessCricle: '门店商圈',
        businessCricleDetail: '商圈详情',
        //产品中心
        ProductCenter: '产品中心',
        ProductCenter_detail: '产品详情',
        // 用户手续费
        userFee: "用户手续费",
        userFeeAdd: "新建",
        userFeeEdit: "编辑",
        userFeeDetail: "详情",
        // 点评
        comment: "点评管理",
        commentList: "点评列表",
        commentList_audit: "点评审核",
        commentList_detail: "点评详情",
        complaint: "点评投诉",
        complaint_audit: "投诉处理",
        complaint_detail: "投诉详情",

        cmsAdd: '新增卡片',
        cmsEdit: '修改卡片',
    },
}
