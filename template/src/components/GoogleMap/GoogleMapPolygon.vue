<script>
import colorPalette from "@/utils/GoogleMap/colorPalette";

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    paths: {
      type: Array,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: () => true
    },
    color: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      polygon: {},
    }
  },
  mounted() {
    let newVal = this.paths
    const {Polygon} = this.google.maps;
    let colorSetting = {};
    if (this.color) {
      colorSetting = {
        strokeColor: this.color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: this.color,
        fillOpacity: 0.35,
      }
    }
    this.polygon = new Polygon({
      paths: newVal,
      map: this.map,
      draggable: this.editable,
      editable: this.editable,
      ...colorSetting
    });
    const {event} = this.google.maps;

    if (this.editable) {
      event.addListener(this.polygon, 'dragend', () => {
        console.log('dragend')
        let path = this.polygon.getPath()
        let region = path.getArray().map(item => ({lat: item.lat(), lng: item.lng()}));
        this.$emit("regionUpdated", {region, event: 'rightClick'})
      })
      event.addListener(this.polygon, 'rightclick', ({vertex}) => {
        let path = this.polygon.getPath();
        let len = path.getLength()
        if (vertex && len > 3) {
          path.removeAt(vertex);
          let region = path.getArray().map(item => ({lat: item.lat(), lng: item.lng()}));
          this.$emit("regionUpdated", {region, event: 'rightClick'})
        }
      })
    }

    this.updatePaths(newVal)
    setTimeout(() => this.$emit('polygonMounted', this.polygon), 300)

  },
  beforeDestroy() {
    let {polygon} = this;
    if (polygon && polygon.setMap) {
      polygon.setMap(null)
    }
  },
  methods: {
    updatePaths(paths) {
      let {polygon} = this;
      if (!polygon) {
        return;
      }
      polygon.setPath(paths)
    },
    getParams() {
      /**
       * path=fillcolor:0xAA000033|color:0xFFFFFF00|enc:
       * enc后面是经纬度列表, 算法后的数据
       */
      if (this.polygon) {
        let {fillColor} = this.polygon
        fillColor = encodeURIComponent(fillColor.substr(1))
        let path = this.polygon.getPath()
        let enc = this.google.maps.geometry.encoding.encodePath(path)
        return `path=fillcolor:0x${fillColor}80%7Ccolor:0xFFFFFF00%7Cenc:${encodeURIComponent(enc)}`
      }
      return '';
    },
    getRegion() {
      return this.polygon.getPath().getArray().map(item => ({lat: item.lat(), lon: item.lng()}))
    },
    focus() {
      let {paths, map, google: {maps: {LatLngBounds, LatLng}}} = this
      let bounds = new LatLngBounds();
      for (let i = 0; i < paths.length; i++) {
        let point = new LatLng(paths[i].lat, paths[i].lng);
        bounds.extend(point);
      }
      map.fitBounds(bounds);
    },
    getArea() {
      let {polygon, google} = this;

      return google.maps.geometry.spherical.computeArea(polygon.getPath())

    }
  }
  ,
  watch: {
    paths(newVal) {
      this.updatePaths(newVal)
    },
    color(newVal) {
      let color = newVal || colorPalette.COLOR_BLACK
      let {polygon} = this;
      if (polygon) {
        polygon.setOptions({
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
        })
      }

    }
  },
  render() {

  },
}

</script>
