<template>
    <div class="image-gallery" v-viewer v-if="imgList.length">
        <img
            class="image-item"
            v-for="(img,index) in imgList"
            :src="img"
            alt="image-item"
            :style="{ position: index ? 'absolute' : undefined }"
        />
        <span v-if="imgList.length > 0" class="count-indicator">{{imgList.length}}</span>
    </div>
</template>

<script>
export default {
    name: "image-gallery",
    props: {
        imgList: {
            type: Array,
            default: () => []
        },
    }
}
</script>

<style lang="stylus" scoped>
    .image-gallery
        position: relative
        display: inline-block
        width: 100px
        height: 100px
        margin: 10px

        .image-item
            width: 100%
            height: 100%
            cursor: pointer
            z-index: -1

        .count-indicator
            position: absolute
            right: 0
            bottom: 0
            width: 20px
            height: 20px
            background-color: #f2f2f2
            border: 1px solid #ccc
            text-align: center
            line-height: 20px
</style>
