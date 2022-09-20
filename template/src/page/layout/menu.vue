<template>
    <Menu
        class="menu-item"
        :class="{'collapsed-menu':isCollapsed}"
        ref="sideMenu"
        :active-name="activeName"
        :open-names="openNames"
        theme="dark"
        accordion
        width="auto"
        @on-select="changeMenu"
        @on-open-change="handleExpand"
    >
        <component
            v-for="item in menuList"
            :is="isSubMenu(item)? 'Submenu':'MenuItem'"
            :name="item.code"
            :key="item.code"
        >
            <template slot="title">
                <!-- TODO 后续的菜单图标也是由后端接口返回 -->
                <Icon
                    class="layout-icon"
                    :type="!!item.routerCfg ? item.routerCfg.icon : defaultIcon"
                />
                <!-- <span class="layout-text">{{$t(item.name)}}</span> -->
                <!-- TODO 此处暂时读回前端菜单名,后续改为读取后端 -->
                <!-- 后续去除iview tooltip(他的太辣鸡),自行实现 -->
                <span
                    class="layout-text"
                    :title="$t(item.routerCfg.title)"
                >{{$t(item.routerCfg.title)}}</span>
                <!-- <Tooltip
                    :delay="1e3"
                    class="layout-text"
                    transfer
                    :content="$t(item.routerCfg.title)"
                    placement="right"
                >
                    <span :title="$t(item.routerCfg.title)">{{$t(item.routerCfg.title)}}</span>
                </Tooltip>-->
            </template>
            <!-- TODO 二级菜单布局 -->
            <template v-if="isSubMenu(item)">
                <div v-for="child in item.children" :key="child.code">
                    <MenuItem :name="child.code">
                        <!-- <Icon :type="!!child.routerCfg ? child.routerCfg.icon : defaultIcon"/> -->
                        <!-- <span class="layout-text">{{ $t(child.name) }}</span> -->
                        <!-- TODO 此处暂时读回前端菜单名,后续改为读取后端 -->
                        <span
                            class="layout-text"
                            :title="$t(child.routerCfg.title)"
                        >{{$t(child.routerCfg.title)}}</span>
                        <!-- <Tooltip
                            :delay="1e3"
                            transfer
                            :content="$t(child.routerCfg.title)"
                            placement="right"
                        >
                            <span class="layout-text">{{$t(child.routerCfg.title)}}</span>
                        </Tooltip>-->
                    </MenuItem>
                </div>
            </template>
            <div v-else>{{ $t(item.name) }}</div>
        </component>
    </Menu>
</template>

<script>
const { mapState } = Vuex;

export default {
    name: 'SideMenu',
    props: {
        beforePush: {
            type: Function
        },
        isCollapsed: {
            type: Boolean
        }
    },
    computed: {
        ...mapState({
            menuList: state => state.rolePart.menuList,
            activeMenu: state => state.settings.activeMenu
        }),
        activeName() {
            const activeSecondMenu = this.activeMenu && this.activeMenu[1]
            return activeSecondMenu && activeSecondMenu.name
        },
        openNames() {
            const activeFirstMenu = this.activeMenu && this.activeMenu[0]
            return activeFirstMenu ? [activeFirstMenu.name] : []
        },
    },
    mounted() {
        this.$nextTick((params) => {
            this.getOpenNames()
        })
    },
    updated() {
        this.$nextTick(async () => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateActiveName();
                this.$refs.sideMenu.updateOpened();
            }
        });
    },
    methods: {
        getOpenNames() {
            const routeName = this.$route.name
            const selection = this.menuList.find((item) => {
                return item.children.find((_item) => {
                    return _item.code == routeName
                })
            })
            return !!selection ? [selection.code] : []
        },
        handleExpand(nameList) {
            this.$emit('on-expand', nameList);
        },
        handleChange(name) {
            let willpush = true;
            if (this.beforePush !== undefined) {
                if (!this.beforePush(name)) {
                    willpush = false;
                }
            }
            if (willpush) {
                this.$router.push({
                    name: name
                });
            }
            this.$emit('on-change', name);
        },
        changeMenu(active) {
            // this.$emit('on-change', active);
            this.handleChange(active)
        },
        itemTitle(item) {
            return this.$t(item.title);
        },
        isSubMenu(item) {
            return item.children && item.children.length > 0
        }
    }

};
</script>

<style lang="stylus">
.ivu-menu-submenu-title-icon
    // align-self flex-end
    float none !important
    top 0px !important
// 一级菜单
// 常规
.menu-item
    .ivu-menu-item, .ivu-menu-submenu-title
        padding 14px 10px
        display flex
        align-items center
        justify-content space-between
    .ivu-menu-submenu-title
        .layout-text
            display block
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            vertical-align bottom
            font-size 14px
            flex auto
        // max-width 450px
        // transition max-width 0.4s
        .layout-icon
            transform translateX(0px)
            transition font-size 0.2s
            vertical-align middle
            font-size 16px
        &-icon
            max-width 20px
            overflow hidden
            margin-right 4px
    // 二级菜单
    .ivu-menu-submenu .ivu-menu
        .layout-text
            display block
            font-size 12px
// 折叠的样式
.collapsed-menu
    text-align center
    .layout-text
        flex none !important
        display none !important
    .layout-icon
        // transform translateX(5px)
        vertical-align middle
        font-size 16px
    &-icon
        max-width 20px
        overflow hidden
        margin-right 4px
// 二级菜单
.ivu-menu-submenu .ivu-menu
    .layout-text
        display block
        font-size 12px
.ivu-menu-submenu-title-icon
    position relative !important
    top 0px !important
    right 0px !important
    transform translateY(0) !important
// 折叠的样式
.collapsed-menu
    text-align center
    .layout-text
        flex none !important
        display none !important
    .layout-icon
        // transform translateX(5px)
        vertical-align middle
        font-size 22px
        text-align center
        width 30px
        margin 0
    .ivu-menu-submenu-title-icon
        max-width 0px
        margin 0
        display none
    .ivu-menu-submenu
        &.ivu-menu-item-active .ivu-menu-submenu-title
            background $color_primary
        .ivu-menu
            display none
        .ivu-menu-submenu
            &.ivu-menu-item-active .ivu-menu-submenu-title
                background $color_primary
            .ivu-menu
                display none
        .ivu-menu-item, .ivu-menu-submenu-title
            justify-content center
</style>
