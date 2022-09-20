/*
 * @Description: 门店管理相关API
 * @Author: 管铭钊
 * @Date: 2019/6/6
 */
import config from '@/config';

const { MERCHANT_BOSS_WEB } = config.moduleUrl
/**
 * 门店申请
 */
export const merchant_query = `${MERCHANT_BOSS_WEB}/mer/status/query.do`
// 门店待审核列表查询
export const review_store_list = `${MERCHANT_BOSS_WEB}/mer/review/store/list.do`
// 门店审核详情查询
export const review_store_detail = `${MERCHANT_BOSS_WEB}/mer/review/store/detail.do`
// 门店创建
export const review_store_create = `${MERCHANT_BOSS_WEB}/mer/review/store/add.do`
// 门店审核不通过编辑
export const review_store_edit = `${MERCHANT_BOSS_WEB}/mer/review/store/edit.do`
// 商户操作日志查询
export const review_merchant_history_list = `${MERCHANT_BOSS_WEB}/mer/history/query.do`


/**
 * 门店审核
 */
// 门店审核成功
export const review_store_success = `${MERCHANT_BOSS_WEB}/mer/review/store/success.do`
// 门店审核不通过
export const review_store_fail = `${MERCHANT_BOSS_WEB}/mer/review/store/failed.do`

/**
 * 门店列表
 */
// 门店列表查询
export const store_list = `${MERCHANT_BOSS_WEB}/mer/store/all.do`
// 商户门店列表查询（门店信息）
export const merchant_store_list = `${MERCHANT_BOSS_WEB}/mer/store/list.do`
// 门店详情查询
export const store_detail = `${MERCHANT_BOSS_WEB}/mer/store/detail.do`
// 门店编辑
export const store_edit = `${MERCHANT_BOSS_WEB}/mer/store/edit.do`
// 查询门店下店员信息
export const store_clerk_list = `${MERCHANT_BOSS_WEB}/mer/store/operator/list.do`
// 门店启用
export const store_open = `${MERCHANT_BOSS_WEB}/mer/store/open.do`
// 门店禁用
export const store_close = `${MERCHANT_BOSS_WEB}/mer/store/close.do`
// 校验同一商户下门店名称是否重复
export const store_name_duplicate = `${MERCHANT_BOSS_WEB}/mer/store/name/repetition.do`



/* 门店商圈 */
// 新增商圈
export const store_bc_add = `${MERCHANT_BOSS_WEB}/mer/business/circle/add.do`
// 删除商圈
export const store_bc_delete = `${MERCHANT_BOSS_WEB}/mer/business/circle/delete.do`
// 查询商圈详情
export const store_bc_detail = `${MERCHANT_BOSS_WEB}/mer/business/circle/detail.do`
// 查询商圈列表
export const store_bc_list = `${MERCHANT_BOSS_WEB}/mer/business/circle/list.do`
// 查询商圈操作记录
export const store_nbc_logs = `${MERCHANT_BOSS_WEB}/mer/business/circle/log/list.do`
// 编辑商圈
export const store_bc_update = `${MERCHANT_BOSS_WEB}/mer/business/circle/update.do`



/*------------------------ 个性化标签 ------------------------------*/
// 个性标签列表查询接口
export const store_tag_list = `${MERCHANT_BOSS_WEB}/mer/tag/list.do`
// 隐藏
export const store_tag_hidden = `${MERCHANT_BOSS_WEB}/mer/tag/hidden.do`
// 上线
export const store_tag_visible = `${MERCHANT_BOSS_WEB}/mer/tag/visible.do`
// 导出所有标签
export const store_tag_download_all = `${MERCHANT_BOSS_WEB}/mer/tag/download/all.do`
// 编辑个性化标签
export const store_tag_Edit_update = `${MERCHANT_BOSS_WEB}/mer/tag/single/update.do`
// 新增单个个性化标签
export const store_tag_add = `${MERCHANT_BOSS_WEB}/mer/tag/add.do`
// 导出查询结果
export const store_tag_part = `${MERCHANT_BOSS_WEB}/mer/tag/download/part.do`
// 批量新增个性化标签
export const store_tag_import = `${MERCHANT_BOSS_WEB}/mer/tag/import.do`
// 下载模板
export const store_tag_template = `${MERCHANT_BOSS_WEB}/mer/tag/download/template.do`
// 导入修改标签
export const store_tag_update = `${MERCHANT_BOSS_WEB}/mer/tag/update.do`
// 个性化标签详情
export const store_tag_detail = `${MERCHANT_BOSS_WEB}/mer/tag/detail.do`
// 个性化标签详情日志
export const store_tag_log = `${MERCHANT_BOSS_WEB}/mer/tag/log.do`
// 个性化标签关联门店
export const store_tag_store = `${MERCHANT_BOSS_WEB}/mer/tag/store.do`

/*------------------------ 门店服务 ------------------------------*/
// 门店服务列表查询接口
export const store_tag_serviceList = `${MERCHANT_BOSS_WEB}/mer/store/service/list.do`
// 隐藏或显示门店服务
export const store_tag_display = `${MERCHANT_BOSS_WEB}/mer/store/service/display.do`
// 导出所有门店服务
export const store_tag_serviceDownloadAll = `${MERCHANT_BOSS_WEB}/mer/store/service/download/all.do`
// 导出查询结果
export const store_tag_serviceDownloadPart = `${MERCHANT_BOSS_WEB}/mer/store/service/download/part.do`
// 导入修改内容
export const store_tag_serviceEditAllUpdate = `${MERCHANT_BOSS_WEB}/mer/store/service/update.do`
// 编辑门店服务（单个标签）
export const store_tag_serviceEditSingleUpdate = `${MERCHANT_BOSS_WEB}/mer/store/service/single/update.do`
// 新增单个门店服务接口
export const store_tag_serviceCreateTag = `${MERCHANT_BOSS_WEB}/mer/store/service/add.do`
// 门店服务详情
export const store_tag_serviceDetail = `${MERCHANT_BOSS_WEB}/mer/store/service/detail.do`
// 查询门店服务关联的门店
export const store_tag_serviceStore = `${MERCHANT_BOSS_WEB}/mer/store/service/store.do`
