<!--
 * @Description: 操作记录
 * @Author: Rico.刘一飞
 * @Date: 2019-01-17 10:57:24
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-01-17 14:39:14
 -->

<template>
    <div class="opeartionsList">
        <Timeline>
            <TimelineItem v-for="(item, index) in dataObj" :key="index">
                <p style="color: #80848f">{{item[keys.date || 'operateTime']}}</p>
                <p>{{item[keys.content || 'content']}}</p>
                <p v-if="item.remark">备注：{{item[keys.remark || 'remark']}}</p>
            </TimelineItem>
            <TimelineItem v-if="isShow"><a @click="handleShowAll">{{btnText}}</a></TimelineItem>
        </Timeline>
    </div>
</template>

<script>
export default {
    props: {
        // 时间轴数据
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        // 键名
        keys: {
            type: Object,
            default: () => {
                return {
                    date: 'operateTime',
                    content: 'content',
                    remark: 'remark'
                }
            }
        },
        // 最多展示多少条
        limit: {
            type: Number,
            default: () => {
                return 4
            }
        }
    },
    data() {
        return {
            isAll: false // true computed展示全部
        }
    },
    computed: {
        isShow: function() {
            return this.data.length > this.limit
        },
        dataObj: function() {
            return this.data.length > this.limit && !this.isAll ?
            this.data.slice(0, this.limit):
            this.data
        },
        btnText: function() {
            return this.isAll?'收起':'查看全部'
        }
    },
    methods: {
        handleShowAll() {
            this.isAll = !this.isAll;
        }
    }
}
</script>

<style lang="stylus" scoped>
</style>

