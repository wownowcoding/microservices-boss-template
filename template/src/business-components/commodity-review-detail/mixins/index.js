export default {
  props: {
    detail: {
      type: Object,
      default: {}
    }
  },
  methods: {
    getLabel(val) {
      return `${val}${this.$t('v1.semicolon')}`;
    }
  },
  computed: {
    stateFormat () {
      return this.$store.getters.enumGetter("takeaway-product", "productAuditOperationCode");
    }
  }
}