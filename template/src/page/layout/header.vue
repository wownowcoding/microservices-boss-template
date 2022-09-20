<template>
  <div class="header">
    <div class="left user-select" v-if="isDev">
      <div>
        <Checkbox v-model="isDisabledIm">关闭 IM</Checkbox>
      </div>
    </div>
    <div class="left user-select">
      <div>
        <Checkbox v-model="isSocket">{{ $t('utils.notification_push') }}</Checkbox>
      </div>
    </div>
    <div class="left user-select">
      <div>
        <a href="http://www.talkingdata.com" target="_blank">
          <div>TalkingData</div>
        </a>
      </div>
    </div>

    <div class="left">
      <span class="im" @click="showImIframe" :class="{disabled: this.imVisible}">
        <Badge :count="imCount" status="error" dot>
          <img src="./images/im.png" class="im-text">
        </Badge>
      </span>
    </div>

    <div class="left">
      <Poptip placement="bottom-end">
        <a class="lan">
          <Button size="small">{{ timezone.find(e => e.code === currentTimeZone).message }}</Button>
        </a>
        <div slot="content">
          <div @click="changeTimeZone(item.code)" v-for="item in timezone" :key="item.code" class="tips" :class="{ active: item.code === currentTimeZone }">{{ item.message }}</div>
        </div>
      </Poptip>
    </div>

    <div class="left">
      <RouterSearch v-if="isDev"></RouterSearch>
      <Poptip v-model="visible_lan" placement="bottom-end">
        <a class="lan">
          <Avatar class="avatar rotate">{{ lang }}</Avatar>
        </a>
        <div slot="content">
          <div @click="changeLang(item)" v-for="item in langList" :key="item" class="tips" :class="{ active: item === lang }">{{ lang_func[item] }}</div>
        </div>
      </Poptip>
    </div>

    <div class="right">
      <Poptip v-model="visible" placement="bottom-end">
        <div>
          <a>
            <Avatar class="avatar rotate">{{ realName ? realName.substring(0, 1).toLocaleUpperCase() : '' }}</Avatar>
          </a>
        </div>
        <div slot="title">
          <div class="name">
            <div class="name_top">{{ realName }}</div>
            <span>{{ roleName }}</span>
          </div>
        </div>
        <div slot="content">
          <p class="tips" @click="confirmLogout">{{ $t('login.loginOut') }}</p>
        </div>
      </Poptip>
    </div>
    <Modal v-model="confirmLogoutModal" :title="$t('utils.confirm')" @on-ok="logout">
      <p>{{ $t('login.loginOut') }}</p>
    </Modal>

    <div class="im-iframe" ref="im" :style="imIframeStyle" v-if="!isDisabledIm">
      <div class="im-iframe-content">
        <iframe v-if="!imVisible" ref="iframe" @load="imLoad" :src="imUrl" style="width: 100%; height: 100%" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import Store from '@/utils/store'
import { api_func } from '@/api'
import RouterSearch from './router-search'
import Cookies from 'js-cookie'
import axios from 'axios'
import BossSocket from '@/web-socket'
import Avatar from './avatar';
const { mapActions, mapState } = Vuex
export default {
  name: 'Header',
  components: {
    RouterSearch,
    Avatar
  },
  data() {
    const realName = Store.loadObject('realName')
    const roleName = Store.loadObject('roleName')
    return {
      realName,
      roleName,
      lang_func: {
        zh: '中文',
        en: 'English',
      },
      timezone: [{ code: 'Indian/Christmas', message: this.$t('scriptv2.c69e41c8311198690116fece2cb01bf86') }, { code: 'Asia/Shanghai', message: this.$t('北京时间（东8区）') }],
      visible: false,
      visible_lan: false,
      confirmLogoutModal: false,
      showIm: false,
      imCount: 0,
      isSocket: false,
      isDev: process.env.NODE_ENV === 'development',
      isDisabledIm: true,
      //  是否显示国际化唯一 KEY
      isShowLanguage: false,
      currentTimeZone: Store.loadObject('currentTimeZone') || 'Indian/Christmas'
    }
  },
  watch: {
    isSocket(val) {
      Store.saveObject('isNotification', !!val);
      //  只要不是开发环境就启动 websocket 链接
      if (process.env.NODE_ENV !== 'development') {
        Vue.prototype.$socket = new BossSocket();
      }
      //  是否启用消息推送，取决于变量判断和对象判断
      if (!!val && !Vue.prototype.$socket) {
        this.enNotification();
      }
    },
    isDisabledIm(val) {
      Store.saveObject('isDisabledIm', !!val);
      if (val) {
        this.$refs?.im?.remove();
      }
    }
  },
  mounted() {
    console.log('timezone: ', Store.loadObject('currentTimeZone'));
    this.isDisabledIm = Store.loadObject('isDisabledIm');
    const __isNotification = Store.loadObject('isNotification')
    if ([true, false].indexOf(__isNotification) === -1) {
      this.isSocket = true;
    } else {
      this.isSocket = __isNotification;
    }
    this.Util.timeout(() => {
      
      console.log('start socket and im!')
      if (__isNotification) {
        this.enNotification();
        this.Util.timeout(() => {
          Vue.prototype.$socket = new BossSocket();
        }, 3000)
      }
      this.imInit()
    }, 10000);
  },
  computed: {
    imUrl() {
      let host = 'h5'
      if (typeof this.ssr === 'object' && this.ssr.env !== 'pro') {
        host = `h5-${this.ssr.env}`
      } else if (this.ssr === '') {
        host = `h5-sit`
      }
      return `https://${host}.lifekh.com/mobile-h5/floo-web/index/home`
    },
    imIframeStyle() {
      if (this.showIm) return ''
      return 'width: 0;'
    },
    imVisible() {
      return this.$store.state.app.imVisible
    },
    ...mapState('settings', ['lang', 'langList']),
  },
  methods: {
    changeTimeZone(timez) {
      Store.saveObject('currentTimeZone', timez);
      this.currentTimeZone = timez;
      this.$router.go(0)
    },
    enNotification() {
      if ('Notification' in window) {
        if (Notification && Notification.permission !== 'granted') {
          Notification.requestPermission(status => {
            if (Notification.permission !== status) {
              Notification.permission = status;
            }
          });
        }
      }
    },
    confirmLogout(name) {
      this.confirmLogoutModal = true
      this.visible = false
    },
    async logout() {
      let res = await api_func({}, 'logout')
      if (res.rspCd === '00000') {
        Cookies.remove('BOSS-SHIRO-JSESSIONID')
        this.Util.clearStore();
        this.$router.push({
          path: '/login',
        })
      }
    },
    changeLang(target) {
      let lang = Store.loadObject('lang')
      if (lang === target) {
        return
      }
      if (process?.env?.NODE_ENV !== 'development') {
        axios.get(`/boss/set/language?language=${target}`).then(res => {
          const __timeout = setTimeout(() => {
            clearTimeout(__timeout)
            this.$router.go(0)
            // 更新语言
            this.$store.dispatch('settings/updateLanguage', target)
          }, 500)
        })
      } else {
        this.$router.go(0)
        // 更新语言
        this.$store.dispatch('settings/updateLanguage', target)
      }
    },
    imInit() {
      window.addEventListener('message', event => {
        let query = undefined;
        try {
          query = JSON.parse(decodeURIComponent(event.data));
        } catch (err) { }
        if (query) {
          const type = query.type
          switch (type) {
            case 'close':
              this.showIm = false
              break;
            case 'notice':
              if (!this.showIm && !this.imVisible) {
                this.imCount = 1
              }
            default:
              break;
          }
        }
      })
    },
    imLoad() {
      const operatorNo = Store.loadObject('operatorNo')
      this.$refs.iframe.contentWindow.postMessage(encodeURIComponent(JSON.stringify({
        type: 'ready',
        data: {
          operatorNo: operatorNo,
          operatorType: '11',
          operatorLogo: '',
          showHomeTitle: 1
        }
      })), '*')
    },
    showImIframe() {
      this.showIm = !this.showIm
      this.imCount = 0
    }
  },
}
</script>
<style lang="stylus" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 $gutter_small;
  background: #fff;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
  min-height: 36px;

  .tips {
    cursor: pointer;

    &:hover {
      background: $color_background;
    }

    &.active {
      color: $color_primary;
    }
  }

  .left {
    display: flex;
    align-items: center;
    margin-right: $gutter_small;
  }

  .right {
    display: flex;
    align-items: center;
    font-size: 16px;

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      flex: auto;

      .name_top {
        color: orange;
      }

      a {
        color: #fff;
      }
    }

    .avatar {
      background: $color_primary;
    }
  }
}

.im {
  margin: 0 10px;
  position: relative;
  display: inline-block;
  text-align: center;
  color: #fff;
  width: 24px;
  height: 24px;
  line-height: 24px;
  z-index: 0;
  cursor: pointer;

  & >>> .ivu-badge-dot {
    animation: badgeDot 1s infinite;
  }

  .im-text {
    display: block;
    width: 24px;
    height: 24px;
    text-align: center;
  }

  &::before {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background: $color_primary;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  &.disabled {
    filter: grayscale(1);
    .im-text {
      &.disabled {
        filter: grayscale(1);
      }
    }
  }
}

.im-iframe {
  position: fixed;
  top: 50%;
  right: 0;
  width: 375px;
  height: 82vh;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  transform: translateY(-50%);
  transition: width 0.3s;
  box-shadow: 0 2px 4px 1px rgba(40, 120, 255, 0.08), 0 0 6px 1px rgba(0, 0, 0, 0.08);
}

.im-iframe-content{
  width: 375px;
  height: 100%;
}

@keyframes badgeDot {
  0% {
    background: #ed4014;
  }

  20% {
    background: #fff;
  }

  30% {
    background: #ed4014;
  }

  50% {
    background: #fff;
  }

  90% {
    background: #ed4014;
  }
}
</style>
