<template>
  <div></div>
</template>
<script>
export default {
  name: "validUtils",
  data() {
    return {
    };
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
    // 校验选择的值是否非空
    validRequired(rule, value, callback, source, options) {
      if ((!value && value !== 0) || !(value.toString().trim().length > 0)) {
        callback(new Error(this.$t('tips.required')))
      } else {
        callback()
      }
    },
    validFormPromise(form, apiPromise, args) {
      return new Promise((resolve, reject) => {
        form.validate(async (valid) => {
          if (valid) {
            let res = await apiPromise.apply(this, args)
            resolve(res)
          } else {
            this.onValidateReject.apply(this, [...arguments])
            reject()
          }
        })
      })
    },
    // 校验选择的时间范围是否为非空
    validDateRangeRequired(rule, value, callback, source, options) {
      const [startDate, endDate] = value
      if (!this.moment(startDate).isValid() || !this.moment(endDate).isValid()) {
        callback(new Error(this.$t('tips.required')))
      } else {
        callback()
      }
    },
    onValidateReject() { },
  }
};
</script>

