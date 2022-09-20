<!--
 * @Description: test
 * @Author: Rico.刘一飞
 * @Date: 2019-06-03 17:32:39
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-06-04 19:24:05
 -->

<template>
    <div class="page">
        <chaosSelectTable
            v-model="data1"
            :columns="columns"
            :columnsSelect="columnsSelect"
            :dataSource="data"
            chaosKey="id">
        </chaosSelectTable>
        <Button @click="handleConsole">click</Button>
    </div>
</template>

<script>
import chaosSelectTable from './index'
export default {
    name: 'test',
    data() {
        return {
            columns: [
                {
                    title: this.$t('v1.storeLogo'),
                    key: 'id',
                    align: 'center'
                },
                {
                    title: this.$t('merchant.merchant_name'),
                    key: 'name',
                    align: 'center'
                },
            ],
            columnsSelect: [
                {
                    title: this.$t('merchant.merchantNo'),
                    key: 'id',
                    align: 'center'
                },
                {
                    title: this.$t('merchant.merchant_name'),
                    key: 'name',
                    align: 'center'
                },
            ],
            data: [],
            data1: []
        }
    },
    mounted() {
        for (let i=0; i<30; i++) {
            this.data.push({
                id: `${i+1}`,
                name: `商户${i+1}`
            })
        }
    },
    methods: {
        handleConsole() {
            console.log(this.data1)
        }
    },
    components: {
        chaosSelectTable
    }
}
</script>
<style lang="stylus" scoped>

</style>
