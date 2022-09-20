import { curl } from "../bizApiUtils";
import config from '@/config';
const { SHOP_BOSS } = config.moduleUrl

//  支付单列表
export const payOrderList = (params, config) => curl(params, `${SHOP_BOSS}/payOrder/list.do`, config);
//  在线支付流水
export const payOrderStreamList = (params, config) => curl(params, `${SHOP_BOSS}/payOrder/stream-list`, config);
export const payOrderStreamListUrl = `${SHOP_BOSS}/payOrder/stream-list`
//  在线退款流水
export const payOrderRefundStreamList = (params, config) => curl(params, `${SHOP_BOSS}/payOrder/refund-stream-list`, config);
//  支付订单详情
export const payOrderDetail = (params, config) => curl(params, `${SHOP_BOSS}/payOrder/detail.do`, config);

export const queryPayOrderListRealPay = (params, config) => curl(params, `${SHOP_BOSS}/payOrder/getTotalAmount`, config)

// 支付渠道

// 支付渠道列表
export const getPayChannelList = (params, config) => curl(params, `${SHOP_BOSS}/pay/channel/list.do`, config)
// 支付渠道详情
export const getPayChannelDetail = (params, config) => curl(params, `${SHOP_BOSS}/pay/channel/detail.do`, config)
// 新增支付渠道
export const addPayChannel = (params, config) => curl(params, `${SHOP_BOSS}/pay/channel/add.do`, config)
// 编辑支付渠道
export const updatePayChannel = (params, config) => curl(params, `${SHOP_BOSS}/pay/channel/update.do`, config)

// 渠道商户号详情
export const getChannelMerchantDetail = (params, config) => curl(params, `${SHOP_BOSS}/pay/channel/merchant/detail.do`, config)
// 新增渠道商户号详情
export const addChannelMerchant = (params, config) => curl(params, `${SHOP_BOSS}/pay/channel/merchant/add.do`, config)
// 修改渠道商户号详情
export const updateChannelMerchant = (params, config) => curl(params, `${SHOP_BOSS}/pay/channel/merchant/update.do`, config)


// 更新退款流水单，状态
export const updateOrderGetPayStatus = (params, config) => curl(params, `${SHOP_BOSS}/order/getPayStatus`, config)