import { bizApi, upload, get_upload_url } from '../bizApiUtils'

export const api = bizApi

import config from '@/config'

const { TakeawayProduct } = config.moduleUrl

//  菜品分类-全部查询-根据条件
export const commodityMenuList = params => api(params, `${TakeawayProduct}/boss/menu/list.do`)
//  菜品分类-创建
export const commodityMenuCreate = params => api(params, `${TakeawayProduct}/boss/menu/create.do`)
//  菜品分类-编辑
export const commodityMenuUpdate = params => api(params, `${TakeawayProduct}/boss/menu/update.do`)
//  菜品分类-删除
export const commodityMenuDelete = params => api(params, `${TakeawayProduct}/boss/menu/delete.do`)
//  菜品分类-排序
export const commodityMenuSort = params => api(params, `${TakeawayProduct}/boss/menu/batch/sort.do`)
//  商品-全部查询-分页-根据条件
export const commodityProductPageList = params => api(params, `${TakeawayProduct}/boss/product/page/list.do`)
//  商品-商品更新(包含上下架)
export const commodityProductUpdate = params => api(params, `${TakeawayProduct}/boss/product/update.do`)
//  商品-商品删除-根据条件
export const commodityProductDelete = params => api(params, `${TakeawayProduct}/boss/product/delete.do`)
//  checkStoreSignature
export const commodityProductCheckStoreSignature = params => api(params, `${TakeawayProduct}/boss/product/checkStoreSignature.do`)
//  商品-查询-根据 id
export const commodityProductInfoOfId = params => api(params, `${TakeawayProduct}/boss/product/get.do`)
//  汇总商品-创建
export const commodityProductCreate = params => api(params, `${TakeawayProduct}/boss/multiple/version/gather/create.do`)
//  商品-创建
export const commodityProductCreateInformation = params => api(params, `${TakeawayProduct}/boss/product/create.do`)
//  规格-批量更新(包含库存价格)
export const commoditySpecBatchUpdate = params => api(params, `${TakeawayProduct}/boss/spec/batch/update.do`)
//  门店商品审核数量
export const auditMultipleVersionCount = params => api(params, `${TakeawayProduct}/boss/multiple/version/count.do`)
//  商品批量操作
export const commodityProductBatchOperating = params => api(params, `${TakeawayProduct}/boss/product/batch/operating.do`)
//  商品-全部查询-无分页-根据条件
export const commodityAllList = params => api(params, `${TakeawayProduct}/boss/product/list.do`)
//  商品-批量排序
export const commodityProductBatchSort = params => api(params, `${TakeawayProduct}/boss/product/batch/sort.do`)
//  汇总商品-更新
export const commodityProductBatchUpdate = params => api(params, `${TakeawayProduct}/boss/multiple/version/gather/update.do`)
//  汇总商品-重新编辑
export const commodityProductReUpdate = params => api(params, `${TakeawayProduct}/boss/multiple/version/update.do`)
//  规格-删除
export const commoditySpecDelete = params => api(params, `${TakeawayProduct}/boss/spec/delete.do`)
//  库存操作-批量设置目标库存
export const commoditySpecSetStockBatchUpdate = params => api(params, `${TakeawayProduct}/boss/spec/set/stock/batch/update.do`)
//  商品(快照)-审核操作
export const commodityMultipleVersionAudit = params => api(params, `${TakeawayProduct}/boss/multiple/version/audit.do`)

//  商品标签 添加
export const commodityTagCreate = params => api(params, `${TakeawayProduct}/boss/tag/create.do`)
//  商品标签 删除
export const commodityTagDel = params => api(params, `${TakeawayProduct}/boss/tag/delete.do`)
//  商品标签 详情
export const commodityTagDetail = params => api(params, `${TakeawayProduct}/boss/tag/get.do`)
//  商品标签 列表
export const commodityTagList = params => api(params, `${TakeawayProduct}/boss/tag/page/list.do`)
//  商品标签 非列表
export const commodityTagListNoPage = params => api(params, `${TakeawayProduct}/boss/tag/list.do`)
//  商品标签 编辑
export const commodityTagEdit = params => api(params, `${TakeawayProduct}/boss/tag/update.do`)

// 导入商品
export const commodityImport = params => {
  let formData = new FormData()
  Object.keys(params).forEach(key => {
    formData.append(key, params[key])
  })
  return upload(formData, get_upload_url('/takeaway-product/boss/product/import.do'))
}

// 商品导入新增前校验
export const importSaveBefore = params => {
  let formData = new FormData()
  Object.keys(params).forEach(key => {
    const filterKey = ['storeNo', 'onUploadProgress', 'cancelHandle']
    if (!filterKey.includes(key)) {
      formData.append(key, params[key])
    }
  })
  return upload(formData, get_upload_url(`${TakeawayProduct}/boss/product/import-save-before.do?storeNo=${params.storeNo}`), params.onUploadProgress, params.cancelHandle)
}

// 商品导入更新前校验
export const importUpdateBefore = params => {
  let formData = new FormData()
  Object.keys(params).forEach(key => {
    const filterKey = ['storeNo', 'onUploadProgress', 'cancelHandle']
    if (!filterKey.includes(key)) {
      formData.append(key, params[key])
    }
  })
  return upload(formData, get_upload_url(`${TakeawayProduct}/boss/product/import-update-before.do?storeNo=${params.storeNo}`), params.onUploadProgress, params.cancelHandle)
}
// 商品导入新增
export const importSave = params => api(params, `${TakeawayProduct}/boss/product/import-save.do`)

// 商品导入更新
export const importUpdate = params => api(params, `${TakeawayProduct}/boss/product/import-update.do`)

export const updateCommodityImage = params => api(params, `${TakeawayProduct}/boss/product/update-image.do`)

// 商品日志查询
export const getProductLog = params => api(params, `${TakeawayProduct}/boss/product/log/list.do`)

// 获取日志详情
export const getProductDetail = params => api(params, `${TakeawayProduct}/boss/product/log/detail.do`)

//商品导出
export const exportProduct = `${TakeawayProduct}/boss/product/export.do`

//规格导出
export const exportSpecification = `${TakeawayProduct}/boss/product/export-spec.do`

// 商品复制
export const copyProduct = `${TakeawayProduct}/boss/clone-store-menu-task/add-part-task`

// 门店id是否存在以及目标菜单
export const getStoreMenu = `${TakeawayProduct}/boss/clone-store-menu-task/get-target-store-menu`
