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
            <div class="description">
                <span>📷 {{ image.owner && image.owner.name }}</span>
                <span>{{ image.date && image.date.toLocaleDateString() }}</span>
            </div>
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
    .van-col {
        position: relative;
        overflow: hidden;
    }
    .van-image {
        display: block;
        cursor: pointer;
    }
    .description {
        position: absolute;
        right: 0;
        bottom: -2px;
        left: 0;
        padding: 4px 8px 6px;
        font-size: 0.6rem;
        line-height: 0.8rem;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);

        span:last-child {
            float: right;
        }
    }
}
</style>
