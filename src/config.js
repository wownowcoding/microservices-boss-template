import Vue from 'vue'

let baseURL
let fileUrl
let gwUrl
let fileDisplayURL
window.deployEnv = 'local';
let deployEnv = window.deployEnv;
window.DEPLOY_ENV = window.deployEnv;

window.halwefh = new Date().valueOf().toString() + parseInt(Math.random() * 100000000, 10).toString();

Vue.prototype = Vue && Vue.prototype || {};
if (!Vue.prototype.ssr) {
  //  处理 ssr 数据
  try {
    Vue.prototype.ssr = window.ssrConfig && JSON.parse(decodeURIComponent(window.ssrConfig)) || ''
  } catch (err) {
    Vue.prototype.ssr = {
      env: 'sit',
      hosts: [
        'boss-sit.lifekh.com'
      ],
      preFix: 'boss'
    };
  }
  Vue.prototype.ssr && console.log('【Vue.prototype.ssr】', Vue.prototype.ssr);
}

// 加密
const md5Key = 'J58l2qudG8uCeae4JcWBl2en9zv7xvFa'
const xxteaKey = 'Sarv18m2B02CD1AB50CD475Bo04ssJrca'
// google maps api key
// const mapKey = 'AIzaSyDseHBPXxrUS-8mA8_Ajq1xIBgv4lxyqaI';  // 陈剑
// const mapKey = 'AIzaSyCwBANACEBHb4x7jyZ8klG5Qv9IxzFFG9o'; // Harry
const mapKey = Vue.prototype?.ssr?.env === 'pro' && 'AIzaSyBAzorfhP6OdFQBpN-CLRNUnd160FWwx8c' || 'AIzaSyCwBANACEBHb4x7jyZ8klG5Qv9IxzFFG9o'; // 外卖

const appid = 'SuperMerchant';

const apolloHost = ((Vue.prototype.ssr || {}).hosts || []).find(e => e === window.location.host) || '';

// 开发环境
// TODO 后续调接口不允许在此切换环境
// const __$$buildTime = window.$$buildTime || '';
if (window.location.origin.indexOf('lifekh.com') !== -1) {
  if (window.location.host.indexOf('boss-') !== -1) {
    deployEnv = window.location.host.replace(/boss-|\.lifekh.com/g, '');
  } else {
    //  生产环境
    deployEnv = '';
  }
}

// 前端后门(本地调试生效)
// 登录自动填表单
let door_login = false
// 菜单全部显示 忽略权限 副作用：将会导致菜单管理不可用
let door_menu = false
// 直接进入系统 开发阶段避免登录下线的问题 适合页面初级阶段 不需要请求后端的情况（因为未登录 请求不会成功）
let door_auth = false

const urlStr = apolloHost && apolloHost.indexOf(deployEnv) !== -1 && `${window.location.protocol}//${apolloHost}/` || deployEnv === 'local' && `https://boss-sit.lifekh.com/` || '/';

baseURL = urlStr;
fileUrl = deployEnv && `https://fileserver-${deployEnv === 'local' && 'sit' || deployEnv}.lifekh.com/` || `https://fileserver.lifekh.com/`;
gwUrl = urlStr
// TODO : files暂时写死
fileDisplayURL = `${fileUrl}/files`

// 各环境模块url
const moduleNameMap = {
  BOSS_WEB: 'boss_web',
  // MERCHANT_BOSS_WEB: 'boss_merchant',
  MERCHANT_BOSS_WEB: 'merchant-boss',
  SETTLE_BOSS_WEB: 'boss_settle',
  FILE_WEB: 'file_web',
  SMS_WEB: 'boss_sms',
  // USER_WEB: 'boss_usercenter',
  USER_WEB: 'usercenter-boss',
  NOTIFICATION_WEB: 'boss_notification',
  ACCOUNT_WEB: 'boss_account',
  RECHARGE: 'recharge_boss',
  MARKET_BOSS_WEB: 'marketing-boss',
  COMMON_WEB: 'marketzone-boss',
  INTERNATIONAL_WEB: 'international_web',
  SHOP_BOSS: 'shop/boss',
  SUPER_APP: 'superapp',
  TAKEAWAY_MER: 'takeaway-merchant',
  TakeawayProduct: 'takeaway-product',
  ScanQRCodeOrderFood: 'digitalMenu',
  TakeawayOrder: 'takeaway-order',
  TakeawayDelivery: 'takeaway-delivery',
  BossGroupon: 'groupon-service',
  // cash
  CASH_BRANCH_WEB: 'boss_web',
  CASH_ACCOUNT_WEB: 'boss_web',
  CASH_ORDER_WEB: 'boss_web',
  CASH_BOSS_RISK: 'boss_web',
  CASH_BOSS_SETTLE: 'boss_web', //todo
  DISCOVERY_WEB: 'discovery_web',
  SETTLE_BOSS: 'settle-boss',
  // 聚合层的服务
  NODE_COMPOSITION: 'node-composition',
  // 航空会员服务
  AIR_MEMBER_WEB: 'cam-member-center',
  HELLO_SERVICE: 'hello-service',

  OPEN_WEB: 'open_web'
}

const PAYGO_ORDER_URL = 'https://stat.paygo24.com/Payments'

// 用于区分不同系统的localStorage
const systemFlag = 'vipayboss'

const appRouter = {
  yumNowStore: 'SuperApp://YumNow/storeDetail', // ?storeNo=xxx
  yumNowStoreH5: 'SuperApp://YumNow/storeDetail', // ?storeNo=xxx
  yumNowProdut: 'SuperApp://YumNow/storeProductDetail', // ?storeNo=xxx&goodsId=xxx
  tinhNowStore: 'SuperApp://TinhNow/StoreInfo', // ?storeNo=xxx   /store/{店铺id(格式TN开头)}
  tinhNowStoreH5: '/store/', // store/{店铺id(格式TN开头)}
  tinhNowProduct: 'SuperApp://TinhNow/productDetails', // ?productId=xxx
  tinhNowProductH5: '/product/detail/' // /product/detail/{电商商品id}
}

export default {
  fileDisplayURL,
  baseURL,
  door_login,
  door_menu,
  door_auth,
  fileUrl,
  gwUrl,
  md5Key,
  xxteaKey,
  mapKey,
  systemFlag,
  moduleUrl: moduleNameMap,
  PAYGO_ORDER_URL,
  appid,
  appRouter
}
