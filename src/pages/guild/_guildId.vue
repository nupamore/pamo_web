<template>
    <div>
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

export default {
    data() {
        return {
            images: [{}, {}, {}, {}, {}, {}, {}, {}],
            page: 1,
            total: 0,
        }
    },
    watch: {
        page(val) {
            this.searchImages(val)
        },
    },
    beforeMount() {
        this.searchImages(1)
    },
    methods: {
        async searchImages() {
            const { guildId } = this.$route.params
            const { images, pageMeta } = await imageService.searchImages(
                guildId,
                this.page - 1,
            )
            this.images = images
            this.total = pageMeta.all
        },
    },
}
</script>
