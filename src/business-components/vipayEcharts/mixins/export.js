/**
 * 用来开放给外部调用的一些方式
 */
export default {
  methods: {
    outSetForm(obj) {
      console.log(obj)
      Object.keys(obj).forEach(key => {
        this.$set(this.form, key, obj[key])
      })
      console.log(this.form)
    },
    outSetFormItem(key, value) {
      this.$set(this.form, key, value)
      console.log(this.form)
      this.$forceUpdate()
    }
  }
}