export default {
  //  字符串默认 Props
  defaultStringProps: {
    type: String,
    default: () => ''
  },
  //  Boolean 默认 Props
  defaultBooleanProps: {
    type: Boolean,
    default: () => false
  },
  //  数字默认 Props
  defaultNumberProps: {
    type: Number,
    default: () => 0
  },
  defaultArrayProps: {
    type: Array,
    default: () => []
  },
  defaultObjectProps: {
    type: Object,
    default: () => ({})
  },
  defaultStringAndNumber: {
    type: [Number, String],
    default: () => ''
  }
}