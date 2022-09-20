<template>
    <div class="router-search" :class="{'show-input': isShowInput}">
        <Icon class="search__icon" :type="isShowInput ? 'ios-arrow-forward' : 'md-search'"
              @click.stop="onIconClick"></Icon>
        <Select
            ref="select"
            clearable
            v-model="searchQuery"
            class="search__select"
            placeholder="搜索路由"
            filterable
            @on-change="onSelectChange"
        >
            <OptionGroup
                v-for="group in menuOptions"
                :label="group.meta ? $t(group.meta.title) : ''"
                :key="group.name"
            >
                <Option
                    v-for="option in group.children"
                    :label="option.meta ? $t(option.meta.title) : ''"
                    :value="option.name || ''"
                    :key="option.name"
                >
                </Option>
            </OptionGroup>
        </Select>
    </div>
</template>

<script>
const { mapState } = Vuex;

export default {
    name: "RouterSearch",
    data() {
        return {
            searchQuery: '',
            isShowInput: false,
            fuse: null,
            searchLoading: false,
        }
    },
    computed: {
        ...mapState('permission', ['subMenu']),
        menuOptions() {
            return this.filterRouter(this.$router.options.routes)
        },
    },
    mounted() {
        this.addSelectBlur()
    },
    methods: {
        onIconClick() {
            this.isShowInput = !this.isShowInput
            const selectInstance = this.$refs.select
            const selectInputEl = selectInstance.$el.querySelector('.ivu-select-input')
            // 聚焦并展开选项
            if (this.isShowInput) {
                // 延时等待动画结束
                setTimeout(() => {
                    selectInputEl.focus()
                    selectInstance.visible = true
                    selectInstance.focusIndex = 0
                }, 350)
            }
        },
        onSelectChange(name) {
            this.$router.push({ name })
            this.$nextTick(() => {
                this.$refs.select.clearSingleSelect()
                this.searchQuery = ''
            })

        },
        addSelectBlur() {
            const selectEl = this.$refs.select.$el
            const self = this
            selectEl.addEventListener('focusout', () => {
                self.isShowInput = false
            })
        },
        filterRouter(routers) {
            return routers.filter(route => {
                const isCommonRoute = route.name !== 'mainPageRouter'
                const isThirdLevelRoute = route.name && route.name.split(':').length < 3
                if (isCommonRoute && isThirdLevelRoute) {
                    if (route.children) {
                        route.children = this.filterRouter(route.children)
                    }
                    return true
                } else {
                    return false
                }
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
    .router-search
        margin-right: 10px

        .search__icon
            font-size: 24px
            cursor: pointer

        .search__select
            display: inline-block;
            width: 0;
            font-size: 18px;
            background: transparent;
            border-radius: 0;
            vertical-align: middle;
            overflow: hidden;
            transition: width 0.2s;

        /deep/ .ivu-select-selection
            border-radius: 0
            border: none
            border-bottom: 1px solid #d9d9d9

            .ivu-select-arrow
                display: none

        &.show-input {
            .search__select {
                width: 210px;
            }
        }
</style>
