<template>
  <div class="commodity-review-detail">
    <Card>
      <p slot="title">{{$t('v1.viewDetails')}}</p>
      <!-- 审核状态 -->
      <Row>
        <Col span="4" class="text-center">{{ getLabel($t('v1.commodityReviewStatus')) }}</Col>
        <Col span="18">{{ stateFormat(detail.auditStatus) }}</Col>
      </Row>
      <!-- 分类 -->
      <Row>
        <Col
          span="4"
          class="text-center"
          style="height: 72px;line-height: 72px;"
        >{{ getLabel($t('v1.classify')) }}</Col>
        <!-- <Col span="18">
          <Input :value="detail.classify" disabled style="width: 200px;" />
        </Col>-->
        <Col span="6">
          <Row>
            <Col span="8" class="text-center">
              <div>English</div>
            </Col>
            <Col span="14">
              <Input :value="detail.classify.name" disabled />
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <Row>
            <Col span="8" class="text-center">
              <div>简体中文</div>
            </Col>
            <Col span="14">
              <Input :value="detail.classify.nameZh" disabled />
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <Row>
            <Col span="8" class="text-center">
              <div>ខ្មែរ</div>
            </Col>
            <Col span="14">
              <Input :value="detail.classify.nameKm" disabled />
            </Col>
          </Row>
        </Col>
      </Row>
      <!-- 名称 -->
      <Row>
        <Col
          span="4"
          class="text-center"
          style="height: 72px;line-height: 72px;"
        >{{ getLabel($t('v1.commodityName')) }}</Col>
        <Col span="6">
          <Row>
            <Col span="8" class="text-center">
              <div>English</div>
            </Col>
            <Col span="14">
              <Input :value="detail.name" disabled />
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <Row>
            <Col span="8" class="text-center">
              <div>简体中文</div>
            </Col>
            <Col span="14">
              <Input :value="detail.nameZh" disabled />
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <Row>
            <Col span="8" class="text-center">
              <div>ខ្មែរ</div>
            </Col>
            <Col span="14">
              <Input :value="detail.nameKm" disabled />
            </Col>
          </Row>
        </Col>
      </Row>
      <!-- 相片 -->
      <Row>
        <Col span="4" class="text-center">{{ getLabel($t('v1.photos')) }}</Col>
        <Col span="18" v-if="detail.imagePaths">
          <el-image class="img" :src="detail.imagePaths[0]" :preview-src-list="detail.imagePaths" />
        </Col>
      </Row>
      <!-- 描述 -->
      <Row>
        <Col
          span="4"
          class="text-center"
          style="height: 72px;line-height: 72px;"
        >{{ getLabel($t('v1.description')) }}</Col>
        <Col span="6">
          <Row>
            <Col span="8" class="text-center">
              <div>English</div>
            </Col>
            <Col span="14">
              <Input :value="detail.description" disabled :rows="4" type="textarea" />
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <Row>
            <Col span="8" class="text-center">
              <div>简体中文</div>
            </Col>
            <Col span="14">
              <Input :value="detail.descriptionZh" disabled :rows="4" type="textarea" />
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <Row>
            <Col span="8" class="text-center">
              <div class="child-label">ខ្មែរ</div>
            </Col>
            <Col span="14">
              <Input :value="detail.descriptionKm" disabled :rows="4" type="textarea" />
            </Col>
          </Row>
        </Col>
      </Row>
      <!-- 规格 -->
      <Row>
        <Col span="4" class="text-center">
          <div style="line-height: 112px;" v-text="getLabel($t('v1.specification'))" />
        </Col>
        <Col span="18" v-if="detail.productSpecRespDTOList">
          <Row v-for="e in detail.productSpecRespDTOList" :key="e.id">
            <Col span="8">
              <Row>
                <Col span="8" class="text-center">
                  <div class="child-label" v-text="getLabel($t('v1.specificationPrice'))" />
                </Col>
                <Col span="14">
                  <Input :value="e.salePrice.amount" disabled icon="logo-usd" />
                </Col>
              </Row>
            </Col>
            <Col span="8">
              <Row>
                <Col span="8" class="text-center">
                  <div class="child-label" v-text="getLabel($t('v1.specificationPackingFee'))" />
                </Col>
                <Col span="14">
                  <Input :value="e.packageFee.amount" disabled />
                </Col>
              </Row>
            </Col>
            <Col span="8">
              <Row>
                <Col span="8" class="text-center">
                  <div class="child-label" v-text="getLabel($t('v1.inStock'))" />
                </Col>
                <Col span="14">
                  <Input :value="e.avaialbeStock ? e.avaialbeStock : 0 + ' / '+ e.stock" disabled />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <!-- 原因 -->
      <Row v-show="$route.query.isFirst != '1'">
        <Col span="4" class="text-center">
          <div v-text="getLabel($t('v1.reason'))" />
        </Col>
        <Col span="20">{{detail['auditInfo.rejectReason']}}</Col>
      </Row>
    </Card>
    <slot name="footer-button" />
  </div>
</template>
<script>
import index from "./mixins/index";
import { Image } from 'element-ui';
Vue.use(Image)
export default {
  mixins: [index]
};
</script>
<style lang="stylus">
.commodity-review-detail
  .text-center
    text-align center
  .ivu-row
    margin 20px 0
  .child-label
    height 34px
    line-height 34px
  .img
    width 32px
    height 32px
</style>
