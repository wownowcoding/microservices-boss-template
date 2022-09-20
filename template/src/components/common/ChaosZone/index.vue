<!--
 * @Description: 省市区联动选择框
 * @Author: Rico.刘一飞
 * @Date: 2019-09-25 10:45:33
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-12-07 10:15:56
 -->
<template>
    <div class="chaosZone">
        <Cascader
            :data="zoneData"
            :load-data="loadData"
            v-bind="$attrs"
            v-on="$listeners"
        >
        </Cascader>
        </Cascader>
    </div>
</template>
<script>
import { api, zone_api } from '@/api/cash/api_common';
export default {
    name: 'ChaosZone',
    props: {
        // 渲染层级 - province省、city市、area区
        chaosLevel: {
            type: String,
            default: 'area'
        }
    },
    data() {
        return {
            zoneData: [],
            levelMap: {
                'province': 11,
                'city': 12,
                'area': 13,
            }
        }
    },
    async mounted() {
        const data = await this.ajaxQueryZone()
        this.$set(this, 'zoneData', data)
    },
    methods: {
        async loadData (item, callback) {
            const level = this.levelMap[this.chaosLevel];
            if (item.zlevel === level) {
                return
            }
            item.loading = true
            let data = await this.ajaxQueryZone(item.code, item.zlevel+1)
            item.children = data
            item.loading = false
            callback()
        },
        async ajaxQueryZone(code=855000000, zlevel=11) {
            const level = this.levelMap[this.chaosLevel];
            let params = {
                code,
                zlevel
            }
            let {data=[], rspCd} = await api(params, zone_api);
            data && data.forEach(item => {
                item.label = item.name
                item.value = item.code
                item.zlevel = zlevel

                if (zlevel !== level) {
                    item.children = []
                    item.loading = false
                }
            });
            if (rspCd+''==='00000') {
                return data || []
            }

        }
    }
};
</script>
<style lang="stylus" scoped>
.chaosZone
    /deep/
        .el-cascader
            line-height 32px
            .el-input__inner
                height 32px
                line-height 32px
            .el-input .el-input__inner:focus, .el-input.is-focus .el-input__inner
                border-color #f39322
            .el-input__icon
                line-height 32px
</style>
