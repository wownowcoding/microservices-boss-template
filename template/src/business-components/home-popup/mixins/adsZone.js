
import {
  configPopAdsGetPopGetAdsZoneList
} from "@/api/adManage.js";

let adsZone = null

export default {
  data() {
    return {
      adsZone: adsZone || []
    }
  },
  computed: {
    adsZoneAll() {
      return [{code: 'all', message: this.$t('v4_1_1.all')}, ...this.adsZone]
    },
  },
  created() {
    if (adsZone) {
      this.adsZone = [...adsZone]
    } else {
      configPopAdsGetPopGetAdsZoneList().then(res => {
        adsZone = res.data.map(item => {
          let message = item.message['en-US'] || item.message['zh-CN']
          if (this.$store.state.settings.lang === 'en' && item.message['en-US']) {
            message = item.message['en-US']
          } else if (this.$store.state.settings.lang !== 'en' && item.message['zh-CN']) {
            message = item.message['zh-CN']
          }
          return { code: item.code , message }
        })
        this.adsZone = [...adsZone]
        this.adsZoneLoad && this.adsZoneLoad()
      })
    }
  },
  methods: {
    adsZoneEnum(v) {
      const ft = this.adsZone.find(item => item.code == v)
      if (ft) return ft.message
      return v
    },
  }
}
