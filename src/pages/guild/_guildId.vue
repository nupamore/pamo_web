<template>
    <div>
        <van-search v-model="searchUploader" placeholder="Uploader name" />
        <ImageList :images="images" />
        <van-pagination v-model="page" :total-items="total" :show-page-size="5">
            <template #prev-text>
                <van-icon name="arrow-left" />
            </template>
            <template #next-text>
                <van-icon name="arrow" />
            </template>
            <template #page="{ text }">{{ text }}</template>
        </van-pagination>
    </div>
</template>

<script>
import imageService from '~/services/image'
import { debounce } from 'lodash'

export default {
    data() {
        return {
            searchUploader: '',
            images: [{}, {}, {}, {}, {}, {}, {}, {}],
            page: 1,
            total: 0,
        }
    },
    watch: {
        searchUploader: debounce(function () {
            this.searchImages()
        }, 200),
        page() {
            this.searchImages()
        },
    },
    beforeMount() {
        this.searchImages()
    },
    methods: {
        async searchImages() {
            const { guildId } = this.$route.params
            const { images, pageMeta } = await imageService.searchImages(
                guildId,
                this.searchUploader,
                this.page - 1,
            )
            this.images = images
            this.total = pageMeta.all
        },
    },
}
</script>
