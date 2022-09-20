/*
 * @Description:
 * @Author: Rico.刘一飞
 * @Date: 2018-11-14 14:32:32
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2018-11-15 14:17:08
 */


<template>
    <div class="page account">
        <Card>
            <div slot="title">
                用户账户余额信息列表下载
            </div>
            <table border class="account_wrap">
                <tr>
                    <th style="width: 500px">报表名称</th>
                    <th style="width: 200px">操作</th>
                </tr>

                <tr>
                    <td>{{reportName}}</td>
                    <td><a :href="handleExport" download="">点击下载</a></td>
                </tr>
            </table>
        </Card>
    </div>
</template>

<script>
import config from '@/config';
import { api, queryReportName, handleExportReport } from "@/api/whiteList";

let {baseURL} = config;
export default {
    data() {
        return {
            handleExport: baseURL+handleExportReport,
            reportName: 'user_blance_ddmmyyyy.csv'
        }
    },
    methods: {
        // 获取报表名称
        async queryReportName() {
            let { rspCd, data } = await api({}, queryReportName);
            if ('00000' === rspCd + '') {
                this.reportName = data;
            }
        }
    },
    mounted() {
        this.queryReportName();
    }
}
</script>

<style lang="stylus" scoped>
.account
    &_wrap
        margin 30px
        text-align center
        border 1px solid #ababab
        td, th
            padding 16px
        th
            background #f2f2f2
</style>

