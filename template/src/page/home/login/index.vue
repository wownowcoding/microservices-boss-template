<template>
  <div class="login">
    <div class="login-con" @keyup.enter="handleSubmit">
      <div class="inner">
        <div v-if="!googleAuth" class="card">
          <div class="head">
            <img src="~@/assets/vipay-logo.png" alt />
          </div>
          <div class="form-con">
            <Form ref="form" :model="form" :rules="rules" @submit.native.prevent>
              <FormItem prop="user">
                <Input type="text" v-model="form.loginName" @on-blur="isNeedCaptcha" :placeholder="$t('login.user')">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input :type="showPwd ? 'text' : 'password'" v-model="form.password" :placeholder="$t('login.pass')" :icon="showPwd ? 'ios-eye' : 'ios-eye-off'" @on-click="toggleShowPwd">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <Row type="flex" justify="space-between" class="captcha-wrapper" v-show="showSendCode" :gutter="8">
                <Col :span="18">
                  <FormItem prop="captcha">
                    <Input type="text" v-model="form.captcha" :placeholder="$t('login.valid')">
                      <Icon type="ios-mail" slot="prepend"></Icon>
                    </Input>
                  </FormItem>
                </Col>
                <Col :span="6">
                  <img class="captcha" :src="showSendCode ? captcha : ''" @click="editCaptcha" />
                </Col>
              </Row>
            </Form>
            <div class="tips">
              <div class="val">
                <i-switch v-model="isRemerber" size="small" class="isRemerber"></i-switch>
                <span @click="toggle">{{ $t('login.remenber_user') }}</span>
              </div>
              <div class="val" style="margin-left: 10px;" @click="goUpload" v-if="['sit', 'uat', 'local'].indexOf(deployEnv) !== -1">
                <span> {{ $t('v2_1_1.uploadFiles') }} </span>
              </div>
            </div>
            <!--登录按钮-->
            <div class="buttons_wrap">
              <Button :loading="loginLoading" @click="handle_login" class="spec">
                {{ $t('login.login') }}
              </Button>
            </div>
          </div>
        </div>

        <div v-else class="card card_google">
          <!-- 二次验证登录 -->
          <div class="ttle">{{ $t('part_second.google_login') }}</div>
          <!-- 你的账号已开启Google二次验证登录，请输入Google验证码 -->
          <div class="desc">{{ $t('part_second.google_login_desc') }}</div>
          <Form ref="googleForm" :model="googleForm" :rules="googleRules" @submit.native.prevent>
            <FormItem prop="google_code">
              <Input type="text" v-model="googleForm.google_code" autofocus :placeholder="$t('part_second.google_code')" />
            </FormItem>
            <FormItem>
              <div class="google-login-btns">
                <Button @click="reloadLogin">{{ $t('operation.cancel') }}</Button>
                <Button type="primary" @click="googleAuth_submit">{{ $t('operation.confirm') }} </Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Store from '@/utils/store'
import md5 from 'md5'
import xxtea from '@/utils/xxtea'

import { api_func, captcha, checkCaptcha } from '@/api'
import config from '@/config'

let { baseURL, xxteaKey, md5Key, door_login } = config
const { mapActions, mapState } = Vuex

export default {
  data() {
    return {
      deployEnv: window.deployEnv,
      loginLoading: false,
      form: {
        loginName: '',
        password: '',
        captcha: ''
      },
      googleForm: {
        google_code: ''
      },
      rules: {
        loginName: [{ required: true, message: this.$t('tips.required'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('tips.required'), trigger: 'blur' }]
      },
      googleRules: {
        google_code: [{ required: true, message: this.$t('tips.required'), trigger: 'blur' }]
      },
      googleAuth: false,
      google_code: null,
      captcha: baseURL + captcha + '?d=' + Math.random(),
      showSendCode: false,
      isRemerber: false,
      showPwd: false,
      // 发送验证码
      send_code_button_value: null
    }
  },
  mounted() {
    this.send_code_button_value = this.$t('utils.send')
    // 是否有记住密码
    if (Store.loadObject('isRemerber')) {
      this.isRemerber = true
      this.form.loginName = Store.loadObject('loginName')
    }
    this.isNeedCaptcha()
  },
  methods: {
    goUpload() {
      window.open('https://boss.lifekh.com/boss/upload-static-resources');
    },
    reloadLogin() {
      window.history.go(0)
    },
    toggleShowPwd() {
      this.showPwd = !this.showPwd
    },
    handleSubmit() {
      this.googleAuth ? this.googleAuth_submit() : this.handle_login()
    },
    async isNeedCaptcha() {
      let flag = false
      if (!!this.form.loginName && this.form.loginName.length > 0) {
        let res = await api_func({ loginName: this.form.loginName }, 'checkCaptcha')
        if (res.rspCd === '00000') {
          flag = res.data
        }
      }
      this.showSendCode = flag
    },
    editCaptcha() {
      this.captcha = baseURL + captcha + '?d=' + Math.random()
    },
    toggle() {
      this.isRemerber = !this.isRemerber
    },
    handleSubmitSuccess(res) {
      try {
        const isShowLanguage = Store.loadObject('isShowLanguage') || false;
        Store.saveObject('isShowLanguage', false);
        this.Util.clearStore();
        this.$store.commit('account/beforeDestroy');
        Object.keys(res.data.operatorInfo).forEach(e => {
          Store.saveObject(e, res.data.operatorInfo[e]);
        });
        Store.saveObject('operatorInfo', encodeURIComponent(JSON.stringify(res.data.operatorInfo)));
        // modPwd 此字段如果是true 要强制进入修改密码页面 修改成功后改成false
        Store.saveObject('modPwd', res.data.modPwd)
        // 作为路由判断是否跳回登录页的标识
        Store.saveObject('isSessionValid', true)
				Store.saveObject('sessionId', res.data.sessionId)
        Cookies.set('roleNo', res.data.operatorInfo.roleNo);
        Cookies.set('roleName', res.data.operatorInfo.roleName);
        Cookies.set('realName', res.data.operatorInfo.realName);
        if (isShowLanguage && isShowLanguage?.toString?.() === 'true') {
          window?.loadLanguageAsync?.();
        }
      } catch (err) {
        console.log('save user info error: ', err)
      }
      const __timeout = setTimeout(() => {
				clearTimeout(__timeout);
				if (res?.data?.modPwd) {
					this.$router.push({ path: '/change-password' })
				} else if (this?.$route?.query?.loginCallback) {
					window.location.href = decodeURIComponent(this?.$route?.query?.loginCallback)
				} else {
					this.$router.push({ path: '/home' })
				}
			}, 20);
    },
    async googleAuth_submit() {
      this.$refs.googleForm.validate(async flag => {
        if (flag) {
          try {
            this.$Spin.show()
            let res = await api_func({ securityCode: this.googleForm.google_code }, 'google_login')
            if (res.rspCd === '00000') {
              const sessionId = (res && res.data && res.data.sessionId) || ''
              !!sessionId && Cookies.set('BOSS-SHIRO-JSESSIONID', sessionId)
              // 登录成功~
              // this.$Message.success(this.$t('tips.login_success'))
              this.handleSubmitSuccess(res)
            }
          } catch (e) {
            console.log(e, 'e')
          } finally {
            this.$Spin.hide()
          }
        }
      })
    },
    async handle_login() {
      let { loginName, password, captcha } = this.form

      // 记住密码
      if (this.isRemerber) {
        Store.saveObject('isRemerber', true)
        Store.saveObject('loginName', loginName)
      } else {
        Store.saveObject('isRemerber', false)
        Store.saveObject('loginName', '')
      }

      let params = {
        loginName,
        password: md5(`${password}${md5Key}`),
        captcha
      }

      this.$refs.form.validate(async flag => {
        if (flag) {
          this.loginLoading = true
          try {
            let res = await api_func(params, 'login')
            if (res.rspCd === '00000') {
              this.googleAuth = true
              this.googleForm.google_code = ''
            } else {
              this.showSendCode = true
              this.editCaptcha()
            }
          } catch (e) {
            console.log(e, 'e')
          } finally {
            this.loginLoading = false
          }
        }
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 480px;
    padding: 30px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .spec {
    width: 100%;
    background-color: #f39322;
    border-radius: 6px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f39322c7;
    }
  }

  .login-con {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: url('~@/assets/login.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner {
      // width: 300px;
    }

    .form-con {
      padding: 10px 0 0;
    }

    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }

    .head {
      display: flex;
      justify-content: center;
    }

    .tips {
      display: flex;
      align-items: center;
      color: #818181;
      cursor: pointer;

      .isRemerber {
        margin-right: 15px;
      }
    }

    .captcha-wrapper {
      // width 100% 用iview的Row包含后,不可给容器设置宽度,避免影响其样式
      .captcha {
        display: block;
        width: 100%;
        height: 32px;
        border: 1px solid #dddee1;
        border-radius: 3px;
      }
    }
  }

  .card_google {
    padding: 30px 30px 0 30px;

    .ttle {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 18px;
      margin-bottom: 30px;
    }

    .desc {
      margin-bottom: 15px;
    }

    .google-login-btns {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      margin-bottom: 15px;

      & > .ivu-btn {
        margin-left: 15px;
      }
    }
  }
}
</style>
