<template>
  <div class="layout">
    <Layout class="layout-con">
      <!--导航栏收起/展开按钮-->
      <div :class="{ 'is-fold': isFold }" class="sider-trigger user-select"  @click="toggleSider">
        <img class="sider-trigger-icon" :class="{ 'is-fold': isFold }" src="~@/assets/pack_up.png" alt="" />
      </div>
      <Sider class="sider user-select" :width="siderWidth" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <div class="sider-inner">
          <div class="inner-header">
            <div class="logo">
              <router-link :to="{ path: '/' }">
                <img src="~@/assets/vipay_logo.png" />
              </router-link>
            </div>
            <div class="shadow-box"></div>
          </div>
          <div class="menu-wrapper boss-menu-wrapper">
            <Scrollbar style="height: 100%" wrap-class="menu">
              <Menu class="menu" :isFold="isFold" :isCollapsed="isCollapsed" @on-expand="handleExpandMenu" @refresh="refreshPage" />
            </Scrollbar>
          </div>
        </div>
      </Sider>
      <Layout class="layout-con">
        <div class="main-view-wrapper">
          <Header class="header user-select" />
          <Content class="content" ref="content">
            <Bread class="breadcrumb user-select" :refresh-key.sync="refreshKey" />
            <div class="content-card" :key="refreshKey">
              <Scrollbar style="height: 100%" wrap-class="router-view" ref="scrollbar">
                <transition name="fade-transform" mode="out-in">
                  <keep-alive :include="keepRoute" v-if="isShowRouter">
                    <router-view class="router-view" />
                  </keep-alive>
                </transition>
              </Scrollbar>
            </div>
          </Content>
        </div>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Bread from './bread'
import Menu from './menu/index'
import Header from './header'
import Store from '@/utils/store'
import { Scrollbar } from 'element-ui'
import i18n from '@/language'
const { mapState, mapActions } = Vuex

const FOLDWIDTH = 110
const UNFOLDWIDTH = 260

export default {
  name: 'main-container',
  components: { Bread, Menu, Header, Scrollbar },
  data() {
    return {
      isCollapsed: false,
      isFold: false,
      refreshKey: 1,
      keepRoute: [],
      isShowRouter: true
    }
  },
  computed: {
    siderWidth() {
      return this.isFold ? FOLDWIDTH : UNFOLDWIDTH
    },
    ...mapState({
      businessLine: (state, getter) => getter.enumStateArr('basic-common', 'businessLine')
    })
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        this.isShowRouter = false;
        // 解决滚动条不刷新长度及没有回到顶部的问题
        if (this.$refs.scrollbar) {
          this.$nextTick(() => {
            this.$refs.scrollbar.update();
            this.isShowRouter = true;
          })
          this.$refs.scrollbar.wrap.scrollTop = 0
        }
        this.cacheRouter(val, oldVal)
      }
    },
    isFold() {
      this.$nextTick(() => this.Util.timeout(() => this.resetRecalc({
        differenceWidth: 6
      }), 200));
    }
  },
  async created() {
    // 业务逻辑：modPwd 此字段如果是true 要强制进入修改密码页面 修改成功后改成false
    if (Store.loadObject('modPwd')) {
      this.$router.push({ path: '/change-password' })
    }
    // 获取权限表
    await this.get_role_part()
    await this.init()
  },
  mounted() {
    this.cacheRouter(this.$route)
    this.$nextTick(() => {
      //  计算 内容区域的宽高
			const resetRecalc = () => this.resetRecalc()
			//  绑定事件
			window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', resetRecalc.bind(this), false)
			document.addEventListener('DOMContentLoaded', resetRecalc.bind(this), false)
			if (!this?.$root?.contentSite?.width) {
				resetRecalc()
			}
    })
  },
  methods: {
    resetRecalc(params = {}) {
      this.Util.timeout(() => {
        const { differenceWidth = 0, differenceHeight = 0 } = params;
        const { width, height } = this.getStyle(this.$refs.content.$el);
        this.$set(this.$root.contentSite, 'width', width.replace(/px/g, '') - 0 + differenceWidth);
        this.$set(this.$root.contentSite, 'height', height.replace(/px/g, '') - 0 + differenceHeight);
      }, 10);
    },
		getStyle(__el) {
			return __el && (typeof window.getComputedStyle === 'function' && window.getComputedStyle(__el, null) || __el.currentStyle);
		},
    refreshPage() {
      this.isShowRouter = false
      this.$set(this.$root.mixinStore, 'router', {})
      this.$nextTick(() => {
        this.Util.timeout(() => {
          this.$set(this.$root.mixinStore, 'router', {})
          this.$refs.scrollbar.update();
          this.isShowRouter = true
        }, 50);
      })
    },
    ...mapActions(['get_role_part', 'getEnumByKeys']),
    handleExpandMenu({ fold = false } = {}) {
      this.isFold = fold
    },
    init() {
      this.realName = Store.loadObject('realName')
      this.roleName = Store.loadObject('roleName')

      // 获取全局枚举
      this.getEnumByKeys()
    },
    toggleSider() {
      this.isFold = !this.isFold
    },
    // 由于没有多Tab，路由间切换不缓存且只缓存二级页 不影响新建等需要重置状态的操作
    // 路由缓存的前提是建立在组件名称已配置的情况下
    cacheRouter(to, from) {
      const toName = to && to.name,
        fromName = from && from.name
      const getNameArr = name => name && name.split(':')
      const toNameArr = getNameArr(toName)
      const formNameArr = getNameArr(fromName)
      // 只缓存二级页
      if (toNameArr.length !== 2) {
        return
      }
      if (from) {
        // 不缓存目标路由
        const noCacheNext = from.meta && from.meta.noCacheNext
        if (noCacheNext) {
          this.refreshKey++
        }
      }
      // 刷新时直接缓存
      const componentName = this.getComponentName(to)
      const allowCacheRoutes = ['merchant-list', 'merchant-audit', 'merchant-apply', 'agreement', 'store-list', 'store-business-circle', 'store-apply', 'store-audit', 'real-name-audit', 'user-info', 'recharge-order', 'cash-order', 'bussiness-query', 'trade-query', 'refund-query', 'recharge-channel', 'store-tag']
      // 暂时只缓存部分路由（客户中心和交易中心）
      if (allowCacheRoutes.includes(componentName)) {
        this.keepRoute = [componentName]
      }
    },
    getComponentName(route) {
      const component = route.matched.slice(-1)[0]
      if (!component) {
        return
      }
      return component.components.default.name
    }
  }
}
</script>
<style lang="stylus" scoped>
.layout-con {
  height: 100vh;
  width: 100%;
  position: relative;

  .sider {
    position: relative;

    .sider-inner {
      height: 100%;
      display: flex;
      flex-direction: column;

      .inner-header {
        display: flex;
        background-color: #fff;
      }

      .shadow-box {
        position: relative;
        z-index: 1;
        flex: 1;
        box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
      }

      .logo {
        width: 110px;
        background-color: #40495F;
        height: 36px;
        border-bottom: 1px solid #363e4f;
        text-align: center;
        padding: $gutter_small;

        & img {
          display: inline-block;
          width: 50px;
        }
      }

      .menu-wrapper {
        height: 0;
        flex: auto;
      }
    }
  }
}

.sider-trigger {
  position: absolute;
  z-index: 100;
  top: 7px;
  left: 124px;
  cursor: pointer;
  &.is-fold{
    position: fixed;
    z-index: 99999;
  }

  .sider-trigger-icon {
    height: 16px;

    &.is-fold {
      transform: rotate(180deg);
    }
  }
}

.main-view-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    z-index: 1000;
    width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: $gutter;
    // padding 0 $gutter $gutter // 等面包屑做好就放出来
    // margin-top 50px
    height: 0;
    overflow: hidden;

    .content-card {
      height: 0;
      overflow: hidden;
      flex: auto;
    }
  }
}
</style>
<style lang="stylus">
@import '~@/page/layout/scrollBar.styl';

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-scrollbar__view {
  height: 100%;
}

.content-card {
  .el-scrollbar__thumb {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .el-scrollbar__thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.layout {
  & .ivu-layout > .ivu-layout-sider {
    background-color: #40495f;
    transition: all 0.1s ease-in-out;
  }
}

/* fade-transform */
.fade-transform-leave-active, .fade-transform-enter-active {
  transition: all 0.1s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
