<style lang="stylus" scoped>
.changePsw
    width 100%
    height 100%
    display flex
    justify-content center
    align-items center
    overflow hidden
    background url('../../../assets/login.jpg')
    &_wrap
        padding 30px
        width 480px
        height 382px
        background #fff
        border 1px solid rgba(0, 0, 0, 0.125)
        border-radius 4px
        box-shadow 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)
        &--title
            text-align center
        &--btn
            margin-top 30px
</style>
<template>
    <div class="changePsw">
        <div class="changePsw_wrap">
            <div class="changePsw_wrap--title">
                <img src="../../../assets/vipay-logo.png" alt="">
            </div>
            <div>
                <md-field>
                    <label>{{$t('person.old_pass')}}</label>
                    <md-input v-model="old_password" type="password" maxlength="19"></md-input>
                </md-field>
                <md-field>
                    <label>{{$t('person.new_pass')}}</label>
                    <md-input v-model="new_password" type="password" maxlength="19"></md-input>
                </md-field>
                <md-field>
                    <label>{{$t('person.repeat_pass')}}</label>
                    <md-input v-model="repeat_password" type="password" maxlength="19"></md-input>
                </md-field>
            </div>
            <div class="changePsw_wrap--btn">
                <Button style="width: 100%; height: 40px" type="primary"  @click="handleSubmit">{{$t('btn.submit')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config'
import { api_func } from '@/api'
let { baseURL, md5Key } = config
import Store from '@/utils/store'
import md5 from 'md5'

export default {
    name: 'password',
    created() {

    },
    methods: {
        async handleSubmit() {
            let { old_password, new_password, repeat_password } = this;
            if (!old_password || !new_password || !repeat_password) {
                // 请输入完整
                this.$Message.warning(this.$t('tips.enter_comp'))
                return;
            }

            if (new_password !== repeat_password) {
                // 新密码前后不一致
                this.$Message.warning(this.$t('tips.pass_aypism'))
                return;
            }

            let params = {
                newPassword: new_password,
                oldPassword: md5(`${old_password}${md5Key}`)
            }
            let res = await api_func(params, 'modifypwd')
            if (res.rspCd === "00000") {
                this.$Message.success({
                    duration: 3,
                    content: this.$t('tips.successful_operation')
                });
                Store.saveObject('modPwd', false)
                this.$router.push({ path: '/' });
            }
        }
    },
    computed: {

    },
    data() {
        return {
            old_password: '',
            new_password: '',
            repeat_password: ''
        }
    }
};
</script>




