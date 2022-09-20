<template>
    <div class="v-icon" @click="$emit('click')">
        <Icon v-if="isCustomIcon" :custom="`iconfont ${type || defaultIcon}`" v-bind="$attrs" v-on="$listeners"></Icon>
        <Icon v-else :type="type || defaultIcon" v-bind="$attrs" v-on="$listeners"/>
    </div>
</template>

<script>
export default {
    name: "index",
    props: {
        type: {
            type: String
        },
        defaultIcon: {
            type: String
        }
    },
    computed: {
        isCustomIcon() {
            return /^ic-/.test(this.type || this.defaultIcon)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .v-icon
        display: inline-block
</style>
