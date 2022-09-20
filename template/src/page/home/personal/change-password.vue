<style lang="stylus" scoped>
.changePW
    .form
        // margin 0 auto
        width 600px
        padding 30px
</style>
<template>
    <div class="page changePW">
        <Card>
            <div slot="title">修改密码</div>
            <div class="form">
                <Form ref="form" :model="form" :rules="rules">
                    <FormItem prop="old_password">
                        <Input
                            :type="showPwd.oldPw?'text':'password'"
                            v-model="form.old_password"
                            :placeholder="$t('person.old_pass')"
                            :icon="showPwd.oldPw? 'ios-eye': 'ios-eye-off'"
                            @on-click="() => {toggleShowPwd('oldPw')}"
                        >
                            <Icon type="ios-lock" slot="prepend"/>
                        </Input>
                    </FormItem>
                    <FormItem prop="new_password">
                        <Input
                            :type="showPwd.newPw?'text':'password'"
                            v-model="form.new_password"
                            :placeholder="$t('person.new_pass')"
                            :icon="showPwd.newPw? 'ios-eye': 'ios-eye-off'"
                            @on-click="toggleShowPwd('newPw')"
                        >
                            <Icon type="ios-lock" slot="prepend"/>
                        </Input>
                    </FormItem>
                    <FormItem prop="repeat_password">
                        <Input
                            :type="showPwd.repetpw?'text':'password'"
                            v-model="form.repeat_password"
                            :placeholder="$t('person.repeat_pass')"
                            :icon="showPwd.repetpw? 'ios-eye': 'ios-eye-off'"
                            @on-click="() => {toggleShowPwd('repetpw')}"
                        >
                            <Icon type="ios-lock" slot="prepend"/>
                        </Input>
                    </FormItem>
                </Form>
                <div class="buttons_wrap">
                    <Button @click="handleSubmit"  type="primary">{{$t('btn.submit')}}</Button>
                </div>
            </div>
        </Card>
    </div>
    <!-- </div> -->
</template>

<script>
import config from '@/config'
import { api_func } from '@/api'
let { baseURL, md5Key } = config
import Store from '@/utils/store'
import md5 from 'md5'

export default {
    name: 'user-password',
    created() {
    },
    methods: {
        async handleSubmit() {
            let { old_password, new_password, repeat_password } = this.form;
            // if (!old_password) {
            //     this.password_before_empty = true
            // }
            // if (!new_password) {
            //     this.password_err_empty = true
            // }
            // if (!repeat_password) {
            //     this.password_again_empty = true
            // }

            // if (!old_password || !new_password || !repeat_password) {
            //     return;
            // }
            this.$refs.form.validate(async (validate) => {
                if (validate) {

                    if (new_password !== repeat_password) {
                        // 新密码前后不一致
                        this.$Message.warning(this.$t('tips.pass_aypism'))
                        return;
                    }
                    let params = {
                        newPassword: new_password,
                        oldPassword: md5(`${old_password}${md5Key}`)
                    }
                    let { rspCd, rspInf } = await api_func(params, 'modifypwd');
                    if (`${rspCd}` === "00000") {
                        this.$Message.success({
                            duration: 1.5,
                            content: this.$t('tips.successful_operation'),
                            onClose: () => {
                                Store.clear()
                                this.$router.push({ path: '/login' });
                            }
                        });
                    }
                    // else {
                    //     this.$Message.error(rspInf);
                    // }

                }
            })



        },
        // 显示
        toggleShowPwd(key) {
            if (!key) {
                return
            }
            this.showPwd[key] = !this.showPwd[key];
        }
    },
    // watch: {
    //     'form.old_password': {
    //         handler(val, oldVal) {
    //             if (val.length > 0) {
    //                 this.password_before_empty = false
    //             }
    //         },
    //         // 深度观察
    //         deep: true
    //     },
    //     'form.new_password': {
    //         handler(val, oldVal) {
    //             if (val.length > 0) {
    //                 this.password_err_empty = false
    //             }
    //         },
    //         // 深度观察
    //         deep: true
    //     },
    //     'form.repeat_password': {
    //         handler(val, oldVal) {
    //             if (val.length > 0) {
    //                 this.password_again_empty = false
    //             }
    //         },
    //         // 深度观察
    //         deep: true
    //     },
    // },
    // computed: {
    //     password_before_err() {
    //         return {
    //             'md-invalid': this.password_before_empty
    //         }
    //     },
    //     password_err() {
    //         return {
    //             'md-invalid': this.password_err_empty
    //         }
    //     },
    //     password_again_err() {
    //         return {
    //             'md-invalid': this.password_again_empty
    //         }
    //     }
    // },
    data() {
        return {
            // password_before_empty: false,
            // password_err_empty: false,
            // password_again_empty: false,
            form: {
                old_password: '',
                new_password: '',
                repeat_password: '',
            },
            rules: {
                old_password: [{ required: true, message: this.$t('tips.required'), trigger: 'blur' }],
                new_password: [{ required: true, message: this.$t('tips.required'), trigger: 'blur' }],
                repeat_password: [{ required: true, message: this.$t('tips.required'), trigger: 'blur' }],
            },
            showPwd: {
                oldPw: false,
                newPw: false,
                repetpw: false,
            }
        }
    }
};
</script>




