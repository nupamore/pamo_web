<template>
    <div id="guild-detail">
        <van-cell-group>
            <van-cell :title="guild.name">
                <template #default>
                    <van-row>
                        <van-col span="20">
                            <van-search
                                v-model="searchUploader"
                                placeholder="Uploader name"
                            />
                        </van-col>
                        <van-col span="4">
                            <van-popover
                                v-model="showConfig"
                                placement="left"
                                theme="dark"
                                trigger="click"
                                :close-on-click-outside="false"
                                :actions="actions"
                                @select="execAction"
                            >
                                <template #reference>
                                    <van-icon name="setting-o" size="22" />
                                </template>
                            </van-popover>
                        </van-col>
                    </van-row>
                </template>
            </van-cell>
        </van-cell-group>

        <ImageList ref="imageList" :images="images" :selectable="showConfig" />

        <van-pagination v-model="page" :total-items="total" :items-per-page="8">
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
            showConfig: false,
            actions: [{ id: 'DELETE', text: 'Delete', icon: 'delete-o' }],
        }
    },
    computed: {
        auth() {
            return this.$store.getters['auth']
        },
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
            this.search()
        }, 200),
        page() {
            this.search()
        },
    },
    beforeMount() {
        if (!this.guilds.length) this.$store.dispatch('getGuilds')
        this.search()
    },
    methods: {
        async search(nocache) {
            const { guildId } = this.$route.params
            const { images, pageMeta } = await imageService.search(
                guildId,
                this.searchUploader,
                this.page - 1,
                nocache,
            )
            this.images = images.map(img => ({
                ...img,
                deletable: this.guild.isMaster || this.auth.id == img.owner.id,
            }))
            this.total = pageMeta.all
        },
        execAction(action) {
            if (action.id === 'DELETE') this.deleteImages()
        },
        async deleteImages() {
            const { guildId } = this.$route.params
            const images = this.$refs.imageList.myImages.filter(
                img => img.selected,
            )
            // not selected
            if (!images.length) {
                this.$notify({
                    type: 'danger',
                    message: 'Not selected any images',
                })
                return false
            }
            // not confirm
            try {
                await this.$dialog.confirm({
                    message: `Are you sure you want to delete ${images.length} images?`,
                })
            } catch (e) {
                return false
            }

            try {
                await imageService.delete(guildId, images)
                this.$notify({
                    type: 'success',
                    message: `Deleted ${images.length} images`,
                })
                this.search(true)
            } catch (e) {
                this.$notify({
                    type: 'danger',
                    message: 'Delete fail',
                })
            }
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
    .van-icon-setting-o {
        margin: 5px;
        cursor: pointer;
    }
}
</style>
