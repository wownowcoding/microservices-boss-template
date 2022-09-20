import util from '@/utils/util.js'
import config from '@/config'
const {BOSS_WEB, MARKET_BOSS_WEB, MERCHANT_BOSS_WEB, SETTLE_BOSS_WEB, TakeawayOrder} = config.moduleUrl
const date = util.getDate()
const base = config.baseURL
export const urlArray = [
    {'SUBMITTERMINALPOSDATA': `${BOSS_WEB}/terminal/cash/pos/update.do`},
    {'GETTERMINALPOSDETAILLIST': `${BOSS_WEB}/terminal/cash/pos/detail.do`},
    {'SUBMITTERMINALMERCHANTUPDATESTATE': `${BOSS_WEB}/terminal/merchant/update/state.do`},
    {'DELETETERMINALPOSLIST': `${BOSS_WEB}/terminal/cash/pos/delete.do`},
    {'TERMINALCASHPOSCHECK': `${BOSS_WEB}/terminal/cash/pos/check.do`},
    {'SUBMITTERMINALCASHPOSADDDATA': `${BOSS_WEB}/terminal/cash/pos/add.do`},
    {'GETCASHBOSSCOUNTERLIST': `${BOSS_WEB}/cash/boss/counter/list.do`},
    {'DELETETERMINALMERCHANTLIST': `${BOSS_WEB}/terminal/merchant/delete.do`},
    {'GETTERMINALPOSLIST': `${BOSS_WEB}/terminal/cash/pos/list.do`},
    {'GETMERLISTUNAUTHORIZED': `${MERCHANT_BOSS_WEB}/mer/list/unauthorized.do`},
    {'GETTERMINALMERCHANTTYPES': `${BOSS_WEB}/terminal/merchant/list/types.do`},
    {'GETTERMINALMERCHANTBRANDS': `${BOSS_WEB}/terminal/merchant/list/brands.do`},
    {'SUBMITTERMINALMERCHANTDATA': `${BOSS_WEB}/terminal/merchant/update.do`},
    {'SUBMITTERMINALMERCHANTEDITDATA': `${BOSS_WEB}/terminal/merchant/add.do`},
    {'GETTERMINALMERCHANTLIST': `${BOSS_WEB}/terminal/merchant/list.do`},
    {'GETTERMINALMERCHANTDETAILLIST': `${BOSS_WEB}/terminal/merchant/log/list.do`},
    {'GETTERMINALMERCHANTADDCHECK': `${BOSS_WEB}/terminal/merchant/check/device/sn.do`},
    {'GETTERMINALMERCHANTDETAILCARD': `${BOSS_WEB}/terminal/merchant/detail.do`},
    {'GETTERMINALMERCHANTNAMEDETAILS': `${MARKET_BOSS_WEB}//merchant/membership/merchant.do`},
    {'GETTERMINALMERCHANTSTORELIST': `${MERCHANT_BOSS_WEB}/mer/store/list/unauthorized.do`},
    {'GETPRODUCTCASHFEELOGSLIST': `${BOSS_WEB}/charging/rule/charge/log/query.do`},

    {'GETMARKETCOUPONDETAIL': `${MARKET_BOSS_WEB}/coupon/track/detail.do`},
    {'GETMARKETCOUPONTRACKLIST': `${MARKET_BOSS_WEB}/coupon/track.do`},
    {'GETBUSINESSMARKETCOUPONDETAIL': `${MARKET_BOSS_WEB}/merchant/coupon/track/detail.do`},
    {'GETBUSINESSMARKETCOUPONTRACKLIST': `${MARKET_BOSS_WEB}/merchant/coupon/track.do`},
    {'DOWNLOADCOUPONTRACK': `${MARKET_BOSS_WEB}/marketing/takeaway/coupon/track/downloadCouponTrack`},
    {'GETAGENTDEPOSITSETTLEPENDINGDETAIL': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/detail.do`},
    {'GETAGENTDEPOSITSETTLEPENDINGDETAILTOTAL': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/detail/total.do`},
    {'GETAGENTDEPOSITSETTLEPENDINGDETAILTOTAL': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/detail/total.do`},
    {'GETAGENTDEPOSITSETTLEPENDINGINDEXTOTAL': `${SETTLE_BOSS_WEB}/boss/settle/commisson/pending/bill/total.do`},

    {'GETAGENTDEPOSITSETTLEPENDINGSETTLEINDEX': `${SETTLE_BOSS_WEB}/boss/settle/commisson/pending/bill/list.do`},
    {'GETAGENTDEPOSITSETTLESETTLEDINDEX': `${SETTLE_BOSS_WEB}/boss/settle/commisson/settled/bill/list.do`},
    {'SUBMITBILLNOSCLEARSETTLEMENTAUDIT': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/clear/batchAudit.do`},
    {'SUBMITBILLNOSPAYMENTAUDIT': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/payment/batchAudit.do`},
    {'SUBMITBILLNOSSETTLEMENTAUDIT': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/settlement/batchAudit.do`},
    {'SUBMITBILLNOSCLEARSETTLEMENTBATCHAUDIT': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/clear/audit.do`},
    {'SUBMITBILLNOSPAYMENTBATCHAUDIT': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/payment/audit.do`},
    {'SUBMITBILLNOSSETTLEMENTBATCHAUDIT': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/settlement/audit.do`},
    {'GETAGENTDEPOSITSETTLEPENDINGLOGS': `${SETTLE_BOSS_WEB}/boss/settle/commisson/audit/operation/list.do`},
    {'GETAGENTDEPOSITSETTLEDETAILLIST': `${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/detail/list.do`},
    {'SUBMITPENDINGSETTINGVOUCHERUPLOAD': `${SETTLE_BOSS_WEB}/boss/settle/commisson/voucher/upload.do`},
    {'GETAGENTDEPOSITERRORINDEXLIST': `${BOSS_WEB}/merchant/agent-cash/statement/list.do`},
    {'HANDLESETTLECHANNELADVANCESEARCH': `${SETTLE_BOSS_WEB}/boss/settle/channel/advance/list.do`},
    {'HANDLESETTLECHANNELADVANCECOUNT': `${SETTLE_BOSS_WEB}/boss/settle/channel/advance/count.do`},
    {'HANDLESETTLECHANNELADVANCEDETAIL': `${SETTLE_BOSS_WEB}/boss/settle/channel/advance/detail.do`},
    {'SUBMITCASHPENDINGCLEARAUDITCHECK': `${BOSS_WEB}/settle/handle/clear/batch/submit.do`},
    {'SUBMITCASHPENDINGFINANCEAUDITCHECK': `${BOSS_WEB}/settle/handle/finance/audit/batch/submit.do`},
    {'SETTLECLEARINDEXQUERYLIST': `${SETTLE_BOSS_WEB}/boss/bank/clearing/list.do`},
    {'SETTLECLEARINDEXQUERYCOUNT': `${SETTLE_BOSS_WEB}/boss/bank/clearing/count.do`},
    {'SETTLECLEARCASHERRORTABLELIST': `${SETTLE_BOSS_WEB}/boss/bank/clearing/error/list.do`},
    {'SETTLECLEARCASHERRORTABLECOUNT': `${SETTLE_BOSS_WEB}/boss/bank/clearing/error/statistic.do`},
    {'SETTLECLEARORDERINDEXLIST': `${SETTLE_BOSS_WEB}/boss/bank/order/list.do`},
    {'SETTLECLEARORDERINDEXCOUNT': `${SETTLE_BOSS_WEB}/boss/bank/order/list/count.do`},
    {'QUERYSETTLECLEARORDERDETAIL': `${SETTLE_BOSS_WEB}/boss/bank/order/detail.do`},
    {'GETAGENTDEPOSITCASHSTORECASHQUERYTOTAL': `${BOSS_WEB}/merchant/agent-cash/store/count.do`},
    {'GETAGENTDEPOSITCASHSTORERECEIPTQUERYTOTAL': `${BOSS_WEB}/merchant/agent-cash/receipt/count.do`},
    {'GETAGENTDEPOSITCASHMERCHANTRECEIPTQUERYTOTAL': `${BOSS_WEB}/merchant/agent-cash/receivable/count.do`},
    {'GETCOMMISSIONSETTLESTATUSAGENTDEPOSITSETTLEORDERINDEX': `${SETTLE_BOSS_WEB}/boss/settle/commission/order/list.do`},
    {'GETCOMMISSIONSETTLESTATUSAGENTDEPOSITSETTLEORDERBILL': `${SETTLE_BOSS_WEB}/boss/settle/commission/order/check/bill/query.do`},
    {'GETCOMMISSIONSETTLESTATUSAGENTDEPOSITSETTLEORDERDETAIL': `${SETTLE_BOSS_WEB}/boss/settle/commission/order/detail.do`},
    {'SUBMITCOMMISSIONSETTLESTATUSAGENTDEPOSITSETTLEORDERINDEX': `${SETTLE_BOSS_WEB}/boss/settle/commission/order/settle/bill/generate.do`},
]











export const exportUrlArray = [
    {'HANDLEEXPORTRLTFUNDS': `${base}${BOSS_WEB}/boss/settle/channel/check/funds/export.do`},
    {'EXPORTQUERYRESULTOFMARKETCOUPONTRACK': `${base}${MARKET_BOSS_WEB}/coupon/track/downloadCouponTrack`},
    {'SUPEREXPORTQUERYRESULTOFMARKETCOUPONTRACK': `${base}${MARKET_BOSS_WEB}/marketing/takeaway/coupon/track/downloadCouponTrack`},
    {'EXPORTQUERYRESULTOFBUSINESSMARKETCOUPONTRACK': `${base}${MARKET_BOSS_WEB}/merchant/coupon/track/downloadCouponTrack`},
    {'EXPORTAGENTDEPOSITSETTLEPENDINGSETTLEINDEX': `${base}${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/exportBySettleBillNos.do`},
    {'EXPORTAGENTDEPOSITSETTLEPENDINGSETTLEDETAIL': `${base}${SETTLE_BOSS_WEB}/boss/settle/commisson/bill/detail/export.do`},
    {'EXPORTAGENTDEPOSITERRORINDEXLIST': `${base}${BOSS_WEB}/merchant/agent-cash/statement/export.do`},
    {'EXPORTCASHSETTLEPENDINGPRODUCE': `${base}${BOSS_WEB}/settle/report/generate.do`},
    {'EXPORTCASHSETTLEPENDINGPRODUCEDETAIL': `${base}${BOSS_WEB}/settle/report/generate/details.do`},
    {'EXPORTCASHSETTLEPENDINGHANDLE': `${base}${BOSS_WEB}/settle/report/handle.do`},
    {'EXPORTCASHSETTLEPENDINGHANDLEDETAIL': `${base}${BOSS_WEB}/settle/report/handle/details.do`},
    {'EXPORTCASHSETTLECOMPLETED': `${base}${BOSS_WEB}/settle/report/settled.do`},
    {'EXPORTCASHSETTLECOMPLETEDDETAIL': `${base}${BOSS_WEB}/settle/report/settled/details.do`},
    {'EXPORTSETTLECLEARCASHERRORFUNDS': `${base}${SETTLE_BOSS_WEB}/boss/bank/clearing/error/export.do`},
    {'EXPORTSETTLECLEARCASHERRORORDER': `${base}${SETTLE_BOSS_WEB}/boss/bank/clearing/error/order/export.do`},
    {'HANDLESETTLEORDEREXPORTCASHFLAT': `${base}${SETTLE_BOSS_WEB}/boss/settle/order/fund/export.do`},
    {'HANDLESETTLECLEARORDERINDEXOUTPUT': `${base}${SETTLE_BOSS_WEB}/boss/bank/order/export.do`},
    {'HANDLESETTLECLEARORDERINDEXSELECTOUTPUT': `${base}${SETTLE_BOSS_WEB}/boss/bank/order/pending/checked/export.do`},
    {'HANDLEEXPORTAGENTDEPOSITCASHMERCHANTRECEIPTORDERDETAIL': `${base}${BOSS_WEB}/merchant/agent-cash/receivable/merchant/export_order.do`},
    {'EXPORTORDERLIST': `${base}${TakeawayOrder}/boss/order/list/export`},
    {'EXPORTSETTLEMENTQUERY': `${base}${TakeawayOrder}/boss/settlement-query/export`},
    {'EXPORTAFTERSALESMANAGEMENT': `${base}${TakeawayOrder}/boss/after-sales/management/export`},
    {'EXPORTWOWNOWQUERYRESULTOFMARKETCOUPONTRACK': `${base}${MARKET_BOSS_WEB}/wownow/coupon/track/downloadCouponTrack`},
    {'DOWNLOADPROMOCODEDETAIL': `${base}${MARKET_BOSS_WEB}/marketing/promocode/activity/export/downLoadPromoCodeDetail.do`},
]
