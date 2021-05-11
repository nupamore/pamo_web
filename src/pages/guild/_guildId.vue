<template>
    <div id="guild-detail">
        <van-cell-group>
            <van-cell :title="guild.name">
                <template #default>
                    <van-search
                        v-model="searchUploader"
                        placeholder="Uploader name"
                    />
                </template>
            </van-cell>
        </van-cell-group>
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
    computed: {
        guilds() {
            return this.$store.getters['guilds']
        },
        guild() {
            return (
                this.guilds.find(g => g.id == this.$route.params.guildId) || {
                    name: '',
                }
            )
        },
    },
    watch: {
        searchUploader: debounce(function () {
            this.page = 1
            this.searchImages()
        }, 200),
        page() {
            this.searchImages()
        },
    },
    beforeMount() {
        if (!this.guilds.length) this.$store.dispatch('getGuilds')
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

<style lang="scss">
#guild-detail {
    .van-cell__title {
        line-height: 34px;
    }
    .van-search {
        padding: 0;
    }
}
</style>
