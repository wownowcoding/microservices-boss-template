<template>
  <div style="height: 100%;width: 100%">
    <div
      class="google-map"
      ref="googleMap"
    ></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  props: {
    mapConfig: Object
  },

  data() {
    return {
      google: null,
      map: null
    };
  },

  async mounted() {
    this.google = await GoogleMapsApiLoader({
      apiKey: this.mapConfig.apiKey
    });
    this.initializeMap();
  },

  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
    },
    /**
     * 获取静态图片的参数
     */
    getParams() {
      let center = this.map.getCenter();
      let zoom = this.map.getZoom();
      return `key=${this.mapConfig.apiKey}&scale=2&size=600x380&center=${center.lat()},${center.lng()}&zoom=${zoom}`
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 100%;
}
</style>
