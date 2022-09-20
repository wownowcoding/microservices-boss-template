<script>

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
    position: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: () => false
    },
  },
  data() {
    return {
      marker: {},
    }
  },
  mounted() {
    let position = this.position
    const {Marker} = this.google.maps;
    let markerSetting = {};
    this.marker = new Marker({
      position,
      map: this.map,
      draggable: this.editable,
      ...markerSetting,
    });
    const {event} = this.google.maps;

    if (this.editable) {
      event.addListener(this.marker, 'dragend', () => {
        console.log('dragend', this.marker)
      })
    }


  },
  beforeDestroy() {
    let {marker} = this;
    if (marker && marker.setMap) {
      marker.setMap(null)
    }
  },
  methods: {},
  render() {
  },
}

</script>
