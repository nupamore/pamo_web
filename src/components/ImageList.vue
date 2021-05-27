<template>
    <van-row class="image-list" :class="{ selectable: selectable }">
        <van-col
            v-for="image in myImages"
            :key="image.origin"
            :class="{ deletable: image.deletable, selected: image.selected }"
            span="12"
        >
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
                <video :src="`${video}#t=0.001`" controls @click.stop />
            </div>
        </van-overlay>
    </van-row>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
    props: {
        images: Array,
        selectable: Boolean,
    },
    data() {
        return {
            video: '',
            myImages: [],
        }
    },
    watch: {
        images(val) {
            this.myImages = val
        },
        selectable() {
            this.myImages = this.myImages.map(img => ({
                ...img,
                selected: false,
            }))
        },
    },
    methods: {
        onImageClick(image) {
            if (this.selectable) {
                if (image.deletable) image.selected = !image.selected
                return
            }
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
    }
    .van-image {
        display: block;
        cursor: pointer;
    }
    .description {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 4px 8px;
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
.image-list.selectable {
    .van-col:not(.deletable) {
        filter: brightness(0.3);
        .van-image {
            cursor: not-allowed;
        }
    }
    .van-col.deletable {
        filter: opacity(0.5);
    }
    .van-col.selected {
        position: relative;
        filter: none;
        &:after {
            position: absolute;
            top: -2px;
            left: -2px;
            z-index: 1;
            box-sizing: border-box;
            width: calc(100% + 4px);
            height: calc(100% + 4px);
            border: solid 4px #1989fa;
            content: '';
            pointer-events: none;
        }
    }
}
</style>
