<!--
 * @Description: 汇总组件
 * @Author: 黄博方
 * @LastEditors: 黄博方
 * @Date: 2019-03-28 17:09:22
 * @LastEditTime: 2019-05-07 10:40:14
 -->
<template>
    <div class="sum">
        <div v-if="!!totalCount || totalCount == 0" class="sum-total">
            <!-- <div class="sum-total-title">{{$t('utils.query_result')}}</div> -->
            <div class="sum-total-content">{{totalCount}}</div>
            <div class="sum-total-unit">{{$t('utils.query_result_item')}}</div>
        </div>
        <div class="sum-item" v-for="(item,idx) in items" :key="idx">
            <div v-if="item.title" class="sum-item-title">{{item.title}}</div>
            <div class="sum-item-content" v-if="!isHandleCount">{{item.content}}</div>
            <div class="sum-item-content" v-if="isHandleCount">{{ filterContent(item.content, item.unit === 'USD') }}
            </div>
            <div class="sum-item-unit">{{item.unit}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'QuerySum',
    data() {
        return {}
    },
    /**
     * @param {Number} totalCount 汇总的总数值
     * @param {Array} items 汇总的展示项
     *                item {
     *                      title : {String} 展示项的描述文本(前缀)
     *                      content : {String} 展示项的正文文本
     *                      unit : {String} 展示项单位文本(后缀)
     *                  }
     */
    props: {
        totalCount: {
        },
        items: {
            type: Array,
            default: () => []
        },
        isHandleCount: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        filterContent (val, isTrue) {
            const str = String(val).replace(/,/g,'')
            return isNaN(str) ? str : Vue.filter("AmtThousandsFmt")(str, isTrue)
        }
    }
};
</script>
<style lang="stylus" scoped>
.sum
    margin-left $gutter_small
    color #999
    display flex
    flex-direction row
    align-items center
    &-total
        display flex
        margin-right $gutter
        &-title
            margin-right $gutter_small
        &-content
            font-weight bold
            color $color_primary
        &-unit
            margin-left $gutter_small
    &-item
        display flex
        margin-right $gutter
        // &:before
        //     content ', '
        &-title
            margin-right $gutter_small
            &:after
                content ':'
        &-content
            font-weight bold
            color $color_primary
        &-unit
            margin-left $gutter_small
</style>
