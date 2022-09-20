<template>
    <div></div>
</template>
<script>
const { mapState, mapGetters } = Vuex;

export default {
    name: "addPage",
    data() {
        return {
            submitApi: () => {
            },
            form: {}
        };
    },
    computed: {
        ...mapState({
            rolePart: state => state.rolePart.rolePart,
        })
    },
    methods: {
        // 校验选择是否选择文件
        validFileRequired(rule, value, callback, source, options) {
            if (!value || !value.length) {
                callback(new Error(this.$t('tips.file_required')))
            } else {
                callback()
            }
        },
        // 校验选择的值是否为空
        validRequired(rule, value, callback, source, options) {
            if (!value || !(value.toString().trim().length > 0)) {
                callback(new Error(this.$t('tips.required')))
            } else {
                callback()
            }
        },
        validFormPromise(form, apiPromise, args) {
            return new Promise((resolve, reject) => {
                form.validate(async (valid) => {
                    if (valid) {
                        this.onValidateResolve.apply(this, args)
                        let res = await apiPromise.apply(this, args)
                        resolve(res)
                    } else {
                        this.$Message.error(this.$t('tips.valid_fail'))
                        this.onValidateReject.apply(this, [...arguments])
                        reject(this.$t('tips.valid_fail'))
                    }
                })
            })
        },
        // 校验通过后
        onValidateResolve() {
        },
        // 校验不通过后
        onValidateReject() {
        },
        submitSuccess(res) {
        },
        submitFail(res) {
        },
        async submitForm() {
            try {
                let res = await this.submitApi(this.getFormatParams(), true)
                if (res.rspCd === '00000') {
                    this.$Message.success(this.$t("tips.successful_operation"))
                    this.submitSuccess(res)
                    return Promise.resolve(res)
                } else {
                    this.submitFail(res)
                    return Promise.reject(res)
                }
            } catch (e) {
                console.log(e, "e")
                this.submitFail({
                    data: [
                        { rspInf: this.$t("tips.valid_fail") }
                    ]
                })
                return  Promise.reject(e)
            }
        },
        cancelForm() {
            this.$router.go(-1)
        },
        getFormatParams() {
            return Object.assign({}, this.form);
        }
    }
};
</script>

