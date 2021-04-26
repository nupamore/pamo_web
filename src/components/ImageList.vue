<template>
    <van-row class="image-list">
        <van-col v-for="image in images" :key="image.origin" span="12">
            <van-image
                width="100%"
                height="110"
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
import { ImagePreview } from 'vant'

export default {
    props: {
        images: Array,
    },
    methods: {
        onImageClick(src) {
            ImagePreview({
                images: [src],
                closeable: true,
            })
        },
    },
}
</script>

<style lang="scss">
.image-list {
    padding: 10px 12px;
    .van-image {
        display: block;
        cursor: pointer;
    }
}
</style>
