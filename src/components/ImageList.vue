<template>
    <van-row class="image-list">
        <van-col v-for="image in images" :key="image.origin" span="12">
            <van-image
                width="100%"
                height="110"
                fit="cover"
                :src="image.thumb"
                show-loading
                @click="onImageClick(image)"
            >
                <template #loading>
                    <Blur :hash="image.blur" />
                </template>
            </van-image>
            <div class="description">
                <span>📷 {{ image.owner && image.owner.name }}</span>
                <span>{{ image.date && image.date.toLocaleDateString() }}</span>
            </div>
            <van-icon
                v-if="image.type === 'video'"
                name="play-circle"
                class="icon"
                color="#fff"
                size="40"
            />
        </van-col>
        <!-- video -->
        <van-overlay :show="video != ''" @click="video = ''">
            <div class="overlay">
                <video :src="video" controls @click.stop>
                    <source :src="overlay" />
                </video>
            </div>
        </van-overlay>
    </van-row>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
    props: {
        images: Array,
    },
    data() {
        return {
            video: '',
        }
    },
    methods: {
        onImageClick(image) {
            if (image.type === 'video') {
                this.video = image.origin
            } else {
                ImagePreview({
                    images: [image.origin],
                    closeable: true,
                })
            }
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
    .icon {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 10px;
        left: 0;
        width: 40px;
        height: 40px;
        margin: auto auto;
        pointer-events: none;
    }
    .overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        video {
            max-width: 100%;
        }
    }
}
</style>
