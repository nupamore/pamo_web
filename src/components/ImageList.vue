<template>
    <van-row class="image-list">
        <van-col v-for="image in images" :key="image.origin" span="12">
            <van-image
                width="100%"
                height="130"
                fit="cover"
                :src="image.thumb"
                show-loading
                @click="onImageClick(image.origin)"
            >
                <template #loading>
                    <Blur :hash="image.blur" />
                </template>
            </van-image>
        </van-col>
    </van-row>
</template>

<script>
export default {
    props: {
        images: Array,
    },
    methods: {
        onImageClick(src) {
            window.open(src)
        },
    },
}
</script>

<style lang="scss">
.image-list {
    .van-image {
        display: block;
        cursor: pointer;
    }
}
</style>
