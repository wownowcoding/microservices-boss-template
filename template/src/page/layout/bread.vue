<template>
    <div v-show="bread" class="position-bar">
        <Icon type="md-pin" @click="locateMenu"/>
        <Breadcrumb :class="{'loading': breadLoading}">
            <BreadcrumbItem
                v-for="(item,index) in bread"
                :to="index >= 2 && index < 3 ? {name: item.menuCode} : undefined"
                :key="item.menuCode"
            >{{item[menuNameKey] || item.meta && $t(item.meta.title)}}
            </BreadcrumbItem>
        </Breadcrumb>
        <Icon class="bread-loading" type="ios-loading" v-if="breadLoading"/>
        <Icon type="md-return-left" class="icon-btn" style="padding-left: 10px;" @click="$router.go(-1)" />
        <Icon type="md-return-right" class="icon-btn" style="padding-left: 10px;" @click="$router.go(1)" />
        <!-- <Icon class="bread-location" type="md-locate" @click="locateMenu"/> -->
        <Icon
            v-if="isDev"
            @click="refreshPage"
            ref="iconRefresh"
            :class="{rotate: isBtnRotating}"
            class="icon-btn btn-refresh"
            type="md-refresh"
        />
    </div>
</template>

<script>
import { getRouterPath } from "@/api/system";
import api from '@/api/apiUtil'
import Store from '@/utils/store'
const { mapState } = Vuex;

export default {
    name: 'bread',
    props: {
        refreshKey: {
            type: Number,
            default: 1,
        }
    },
    data() {
        return {
            bread: [],
            breadLoading: false,
            isBtnRotating: false,
            isDev: process.env.NODE_ENV === 'development'
        }
    },
    computed: {
        ...mapState('settings', ['activeMenu', 'lang']),
        menuNameKey() {
            return {
                zh: 'menuName',
                en: 'menuNameEn',
            }[this.lang]
        }
    },
    watch: {
        $route: {
            async handler(to, from) {
                await this.getBread(to)
                this.locateMenu()
            },
            immediate: true
        }
    },
    methods: {
        refreshPage() {
            this.$emit('update:refreshKey', this.refreshKey + 1)
            this.isBtnRotating = true
            setTimeout(() => {
                this.isBtnRotating = false
            }, 500)
        },
        async getBread(to) {
            try {
                this.breadLoading = true
                // 根据name判断是否菜单路由
                const [subMenuName, menuName, permissionName] = to.name.split(':')
                let menuCode = to.name
                const breadRoutes = []
                // 权限路由处理
                if (permissionName) {
                    menuCode = `${subMenuName}:${menuName}`
                    breadRoutes.push({ ...to, menuCode: to.name })
                }
                const { data = [] } = await api({ menuCode }, getRouterPath)
                breadRoutes.unshift.apply(breadRoutes, data.reverse())
                this.bread = breadRoutes
                return Promise.resolve(true)
            } catch (e) {
                console.log(e, "e")
                return Promise.reject(false)
            } finally {
                this.breadLoading = false
            }
        },
        // 定位选中菜单
        locateMenu() {
            const activeMenu = this.bread
            // 触发路由监听变化
            this.$store.dispatch('settings/changeSetting', { key: 'activeMenu', value: [] })
            this.$store.dispatch('settings/changeSetting', { key: 'activeMenu', value: activeMenu })
        }
    }
};
</script>
<style lang="stylus" scoped>
    /* 面包屑导航 */
    .position-bar
        min-width 100%
        display flex
        align-items center
        padding-left 15px
        box-sizing border-box
        margin-bottom 5px
        cursor pointer

    .position-bar i
        font-size 18px
        margin-right 10px

    .block-title
        font-weight bold
        font-size 14px

    .ivu-breadcrumb
        &.loading
            /deep/ .ivu-breadcrumb-item-link
                text-decoration line-through !important

    .bread-loading
        margin-left 10px
        animation rotate 1s linear infinite

    .bread-location.ivu-icon
        margin-left 10px
        cursor pointer
        font-size 20px

    .icon-btn
        cursor: pointer
        margin-left: 5px
        color: #999;

        &:hover
            color: #f5a94e;


    .rotate
        animation rotate 0.5s

    @keyframes rotate
        0%
            transform rotate(0deg)
        100%
            transform rotate(360deg)
</style>
