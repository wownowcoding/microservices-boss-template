const { mapGetters } = Vuex;

export const findPagePermission = function (permissionCode) {
  const getters = mapGetters(['hasPagePermission'])
  return getters.hasPagePermission.call(this)(this.$route.name, permissionCode)
}

export const hasPagePermission = function (permissionCode) {
  console.log("hasPagePermission", findPagePermission.call(this, permissionCode))
  return !!findPagePermission.call(this, permissionCode)
}

const permissionControl = {
  name: "permission-control",
  props: {
    permissionCode: {
      type: String,
      required: true
    }
  },
  methods: {
    findPagePermission,
  },
  render (h) {
    const permission = this.findPagePermission(this.permissionCode)
    console.log("permission-control", permission, this.permissionCode)
    if (!permission) return null
    return this.$scopedSlots.default({ permission: permission })
  }
}

export default permissionControl