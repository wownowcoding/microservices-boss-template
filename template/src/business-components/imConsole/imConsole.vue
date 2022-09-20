<template>
  <iframe v-if="visible" ref="iframe" :src="imUrl" style="width: 100%; height: 82vh" frameborder="0"></iframe>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      imUrl: ''
    }
  },
  methods: {
    show(data) {
      const url = this.getHost()
      const params = this.getParams(data)
      this.imUrl = url + '?chaos=' + window.btoa(params)
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    getHost() {
      let host = 'h5'
      if (typeof this.ssr === 'object' && this.ssr.env !== 'pro') {
        host = `h5-${this.ssr.env}`
      } else if (this.ssr === '') {
        host = `h5-sit`
      }
      return `https://${host}.lifekh.com/mobile-h5/floo-web/index/home`
    },
    getParams(data) {
      let params = ''
      for (const x in data) {
        params += `&${x}=${encodeURIComponent(data[x])}`
      }
      return params.substr(1)
    }
  }
}
</script>
