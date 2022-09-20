export default {
  computed: {
    queryList() {
      return [{
          type: "text",
          label: this.$t('v3_1_1.adId'),
          key: "popNo"
        }, {
          type: "text",
          label: this.$t('v2_1_1.adHeadline'),
          key: "popName"
        }, {
          type: "dateRange",
          label: this.$t("v2_1_1.scheduledTime"),
          startDate: "startTime",
          endDate: "endTime",
          format: 'dd/MM/yyyy'
        }, {
          type: "select",
          label: this.$t('v2_1_1.status'),
          key: "status",
          options: this.activeState
        }, {
          type: "select",
          label: this.$t("v2_1_1.deliveryArea"),
          key: "areaCode",
          options: this.adsZoneAll
        }, {
          type: "select",
          label: this.$t("v2_1_1.showFrequency"),
          key: "showType",
          options: this.popShowType
        },
      ]
    }
  }
}
