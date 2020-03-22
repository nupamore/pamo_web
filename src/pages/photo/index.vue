<template>
    <div>
        <div class="divider"></div>
        <el-row class="photo-list">
            <el-col
                v-for="photo in photoList"
                :key="photo.id"
                :md="6"
                :sm="12"
                :xs="12"
            >
                <photo-card
                    :item="photo"
                    :srcList="srcList"
                    @deleteClick="onDeleteImage"
                    @showVideo="onShowVideo"
                    @closeVideo="onCloseVideo"
                ></photo-card>
            </el-col>
        </el-row>
        <div class="divider"></div>
        <el-pagination
            class="center"
            :currentPage="currentPage"
            :page-size="12"
            :total="total"
            layout="prev, pager, next"
            @current-change="getImageList"
        ></el-pagination
        ><video
            class="el-image-viewer__video"
            ref="video"
            width="100%"
            controls="controls"
            autoplay="autoplay"
        >
            <source :src="videoSrc" type="video/mp4" />
        </video>
    </div>
</template>

<style lang="scss"></style>

<script>
import dayjs from 'dayjs'
import api from '@/api/gateway'
import filters from '@/services/filters'

import photoService from '@/services/photo'
import PhotoCard from '@/components/PhotoCard'

export default {
    components: {
        PhotoCard,
    },
    data() {
        return {
            serverId: '',
            uploaderId: '',
            uploaderList: [],
            currentPage: 1,
            videoSrc: '',
        }
    },
    async asyncData() {
        const { photoList, total } = await photoService.getPhotosList()
        return {
            photoList,
            total,
        }
    },
    computed: {
        srcList() {
            return this.photoList.map(img => img.origin)
        },
    },
    methods: {
        async getImageList(page) {
            this.currentPage = page

            const data = await api('GET_IMAGES', {
                path: {
                    guildId: this.serverId,
                },
                params: {
                    owner: this.uploaderId,
                    page: this.currentPage,
                },
            })
            this.imageList = data.images.map(image => {
                const imgUrl = filters.imgUrl(
                    image.channel_id,
                    image.file_id,
                    image.file_name,
                )
                return {
                    userName: image.owner_name,
                    userId: image.owner_id,
                    serverId: this.serverId,
                    fileId: image.file_id,
                    date: dayjs(image.reg_date).format('YYYY-MM-DD'),
                    origin: imgUrl,
                    thumb: filters.origin2Thumb(imgUrl),
                }
            })
            this.pageTotal = data.total || this.pageTotal
        },
        async onServerSelect(serverId) {
            this.serverId = serverId
            this.uploaderId = ''
            this.getImageList(1)
            // uploader list
            const data = await api('GET_UPLOADERS', {
                path: {
                    guildId: this.serverId,
                },
            })
            const uploaderList = data.map(item => ({
                value: item.owner_id,
                label: item.owner_name,
                src: filters.avatarUrl(item.owner_id, item.owner_avatar),
                sub: item.amount,
            }))
            const sum = data.reduce((p, n) => p + n.amount, 0)
            this.uploaderList = [
                { value: '', label: 'All', sub: sum },
                ...uploaderList,
            ]
        },
        onUploaderSelect(uploaderId) {
            this.uploaderId = uploaderId
            this.getImageList(1)
        },
        async onDeleteImage(item) {
            const data = await api('DELETE_IMAGE', {
                path: {
                    imageId: item.fileId,
                },
            })
            if (data) {
                this.imageList = this.imageList.filter(
                    img => img.fileId !== item.fileId,
                )
            }
        },
        onShowVideo(url) {
            this.videoSrc = url
            this.$refs.video.classList.add('show')
            this.$refs.video.load()
        },
        onCloseVideo() {
            this.$refs.video.classList.remove('show')
            this.$refs.video.pause()
            this.$refs.video.currentTime = 0
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/style/_vars.scss';

.photo-list {
    font-size: 0;
}
.el-pager li.active {
    color: #fff;
    background: #409eff;
}
.el-image-viewer__video {
    @include vCenter;
    z-index: 2001;
    max-width: 1280px;
    visibility: hidden;
    opacity: 0;
    &.show {
        visibility: visible;
        opacity: 1;
        transition: 0.5s;
    }
}
</style>
