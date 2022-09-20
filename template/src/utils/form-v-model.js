export default {
  watch: {
    form: {
      handler(val) {
        for (const __key of Object.keys(val)) {
          if (val[__key] !== this.value[__key]) {
            this.updateFormData();
            break;
          }
        }
      },
      deep: true
    },
    value: {
      handler(val) {
        const formKeys = Object.keys(this.form);
        for (const __key of formKeys) {
          if ([undefined, null].indexOf(val[__key]) === -1 && val[__key] !== this.form[__key]) {
            this.form[__key] = val[__key];
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      const formKeys = Object.keys(this.form);
      let isUpdateFormData = false;
      for (const __key of formKeys) {
        if (this.value[__key] !== this.form[__key] && this.value[__key] !== undefined) {
          this.form[__key] = this.value[__key];
        } else if (this.value[__key] === undefined) {
          isUpdateFormData = true;
        }
      }
      if (isUpdateFormData) {
        this.updateFormData();
      }
    });
  },
  methods: {
    updateFormData() {
      this.$emit('input', Object.assign({}, this.value, this.form));
    }
  }
}
