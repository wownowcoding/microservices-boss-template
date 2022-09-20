<template>
  <div class="menu">
    <Scrollbar style="height: 100%" wrap-class="menu" ref="scrollbar" native>
      <Spin size="large" fix v-if="mainMenuLoading"></Spin>
      <!--一级菜单-->
      <ul class="main-menu-list">
        <template v-for="(item, itemIndex) in formatMainMenu">
          <!--分组-->
          <li :key="'menu-' + (itemIndex + 1)" v-if="isMenuGroup(item)" class="main-menu-item type" @click="onMainMenuClick(item)" :class="{ 'is-active': isSameMenu(activeMainMenu, item) }">
            <VIcon class="main-menu-icon" :type="item.icon" :default-icon="defaultIcon" :size="24"></VIcon>
            <div class="main-menu-title">
              <span class="text-multiple-ellipsis">
                {{ item[menuNameKey] }}
              </span>
            </div>
          </li>
          <!--功能页-->
          <router-link :to="{ name: item.menuCode }" v-else :key="'menu-' + (itemIndex + 1)">
            <li class="main-menu-item" @click="activeMainMenu = item" :class="{ 'is-active': isSameMenu(activeMainMenu, item) }">
              <Icon class="main-menu-icon" :type="item.icon || defaultIcon" />
              <div class="main-menu-title">
                <span class="list-item-text">{{ item[menuNameKey] }}</span>
              </div>
            </li>
          </router-link>
        </template>
      </ul>
    </Scrollbar>

    <!--子级菜单-->
    <div class="sub-menu-list">
      <Spin size="large" fix v-if="subMenuLoading"></Spin>
      <Scrollbar ref="subScrollbar" native>
        <div class="sub-menu-item" v-for="(menu, menuIndex) in formatSubMenu" :key="'menuChiln-' + (menuIndex + 1)">
          <!--分组-->
          <template v-if="isMenuGroup(menu)">
            <div class="menu-item-title" @click="onSubMenuClick(menu)">
              <span class="menu-circle"></span>
              <span class="menu-title-text list-item-text">{{ menu[menuNameKey] }}</span>
              <Icon type="ios-arrow-down" class="icon-menu-expand" :class="{ 'is-expand': menu.expand }" style="margin-right: 10px" />
            </div>
            <el-collapse-transition>
              <ul class="menu-item-list" v-show="menu.expand">
                <router-link v-for="subMenu in menu.children" :key="subMenu.businessSeq" tag="span" :to="{ name: subMenu.menuCode }">
                  <li class="list-item" :class="{ 'is-active': isSameMenu(activeSubMenu, subMenu) }"
									@click="activeMenuClick(isSameMenu(activeSubMenu, subMenu))">
                    <span class="list-item-text">{{ subMenu[menuNameKey] }}</span>
                  </li>
                </router-link>
              </ul>
            </el-collapse-transition>
          </template>

          <!--菜单项-->
          <template v-else>
            <router-link tag="span" :to="{ name: menu.menuCode }">
              <li class="list-item" :class="{ 'is-active': isSameMenu(activeSubMenu, menu) }">
                <span class="list-item-text">{{ menu[menuNameKey] }}</span>
              </li>
            </router-link>
          </template>
        </div>
      </Scrollbar>
    </div>
  </div>
</template>

<script>
import { Scrollbar } from 'element-ui'
import VIcon from '@/components/VIcon'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
const { mapState } = Vuex
export default {
  name: 'side-menu',
  components: { VIcon, Scrollbar, [CollapseTransition.name]: CollapseTransition },
  data() {
    return {
      activeMainMenu: {},
      defaultIcon: 'ios-albums-outline',
    }
  },
  computed: {
    ...mapState('permission', ['mainMenu', 'subMenu', 'mainMenuLoading', 'subMenuLoading']),
    ...mapState('settings', ['activeMenu', 'lang']),
    formatMainMenu() {
      // return [...this.mainMenu, ...this.mainMenu];
      return this.mainMenu
      // return Array.isArray(this.mainMenu) && this.filterMenu(this.mainMenu)
    },
    formatSubMenu() {
      this.subMenu.forEach(item => {
        this.$set(item, 'expand', this.isSameMenu(this.expandMenu, item))
      })
      return this.subMenu
      // return Array.isArray(this.subMenu) && this.filterMenu(this.subMenu)
    },
    // 切换菜单语言
    menuNameKey() {
      return {
        zh: 'menuName',
        en: 'menuNameEn',
      }[this.lang]
    },
    // 激活的子级菜单
    activeSubMenu() {
      const activeSubMenu = Array.isArray(this.activeMenu) && this.activeMenu[2]
      return activeSubMenu || {}
    },
    expandMenu() {
      return (Array.isArray(this.activeMenu) && this.activeMenu[1]) || {}
    },
  },
  watch: {
    // 面包屑加载完成改变当前激活菜单
    activeMenu: {
      handler(val) {
        // 未选中主菜单时导航栏默认收起
        if (!val.length) {
          this.$emit('on-expand', { fold: true })
        }
        this.activeMainMenu = (Array.isArray(val) && val[0]) || {}
      },
    },
    // 激活菜单变化或点击切换主菜单时
    async activeMainMenu(val) {
      // 加载子级菜单
      try {
        // 菜单为分组时加载
        if (this.isMenuGroup(val)) {
          await this.$store.dispatch('permission/getSubMenu', { parent: val.businessSeq })
        }
      } catch (e) {
        console.log(e, 'e')
      }
    },
  },
  mounted() {
    this._getMainMenu()
  },
  methods: {
    activeMenuClick(isActive) {
      if (isActive) {
				this.$emit('refresh')
			}
    },
    // 递归筛选菜单
    filterMenu(menuList) {
      return menuList.filter(menu => {
        if (menu.isShow) {
          if (menu.children) {
            menu.children = this.filterMenu(menu.children)
          }
          return true
        } else {
          return false
        }
      })
    },
    async _getMainMenu() {
      try {
        await this.$store.dispatch('permission/getMainMenu')
        this._updateScrollBar()
      } catch (e) {
        console.log(e, 'e')
      }
    },
    onMainMenuClick(item) {
      this.$emit('on-expand')
      this.activeMainMenu = item
    },
    onSubMenuClick(menu) {
      // 展开折叠菜单
      this.$set(menu, 'expand', !menu.expand)
    },
    isMenuGroup(menu) {
      return String(menu.menuType) === '10'
    },
    isSameMenu(menu1, menu2) {
      return menu1.businessSeq === menu2.businessSeq
    },
    // 解决滚动条不触发计算高度的BUG
    _updateScrollBar() {
      this.$nextTick(this.$refs.scrollbar.update)
      this.$nextTick(this.$refs.subScrollbar.update)
      // setTimeout(this.$refs.scrollbar.update, 500)
    },
  },
}
</script>

<style lang="stylus" scoped>
.menu {
  display: flex;
  height: 100%;

  /deep/ .main-menu-title, /deep/ .list-item, /deep/ .menu-title-text {
    font-size: 12px;
  }

  /deep/ .ivu-spin-fix {
    background-color: rgba(64, 73, 95, 0.7);
  }

  & > .el-scrollbar {
    position: relative;
    z-index: 1;
    box-shadow: 0 0 21px 0 rgba(0, 0, 0, 0.31);
  }
}

.main-menu-list {
  width: 110px;
  height: 100%;
  overflow-x: hidden;
  box-shadow: 0 0 21px 0 rgba(0, 0, 0, 0.31);

  .main-menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    min-height: 70px;
    color: #fff;
    background-color: #40495F;
    cursor: pointer;

    &:hover {
      .main-menu-title {
        color: #F39322;
      }
    }

    &.is-active {
      background-color: #F39322;

      .main-menu-title {
        color: #ffffff;
      }
    }

    .main-menu-title {
      width: 100%;
      padding: 0 10px;
      text-align: center;
    }
  }

  .main-menu-icon {
    min-height: 24px;
    font-size: 24px;
    margin-bottom: 5px;
  }
}

.sub-menu-item ~ .sub-menu-item {
  border-top: 1px solid #40495f;
}

.sub-menu-list {
  position: relative;
  flex: 1;
  overflow: auto;
  background-color: #343B4D;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  /deep/ .ivu-spin-fix {
    background-color: rgba(64, 73, 95, 0.7);
  }

  .menu-item-title, .list-item {
    min-height: 40px;
    padding: 10px 10px 10px 20px;
    display: flex;
    align-items: center;
    color: #343B4D;
  }
  .list-item-text {
    word-break: break-word;
    white-space: break-spaces;
  }

  .menu-item-title {
    cursor: pointer;
    color: #fff;

    .menu-title-text {
      flex: 1;
    }

    .menu-circle {
      margin-left: -5px;
      margin-right: 5px;
      background-color: #fff;
      border-radius: 50%;
      width: 5px;
      height: 5px;
    }

    .icon-menu-expand {
      transition: transform 0.3s;

      &.is-expand {
        transform: rotate(180deg);
      }
    }
  }

  .list-item {
    color: #8B95AE;
    cursor: pointer;

    &:hover {
      color: #f39322;
    }

    &.is-active {
      color: #ffffff;
      background-color: #F39322;
    }
  }
}

.text-multiple-ellipsis {
  display: block;
  word-break: break-word;
  white-space: break-spaces;
}
</style>
