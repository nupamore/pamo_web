import { api, axios } from '@/plugins/axios'
import Image from '@/models/Image'

let cancelSource = null

export default {
    async search(guildId, owner, page, nocache) {
        if (cancelSource) cancelSource.cancel()
        cancelSource = axios.CancelToken.source()

        const params = {
            owner,
            page,
            size: 8,
        }
        if (nocache) params.nocache = new Date()
        const { data, pageMeta } = await api({
            cancelToken: cancelSource.token,
            url: `/api/v1/guilds/${guildId}/images`,
            params,
        })
        return {
            images: data ? data.map(i => new Image(i)) : [],
            pageMeta,
        }
    },
    async delete(guildId, images) {
        return await api({
            method: 'DELETE',
            url: `/api/v1/guilds/${guildId}/images`,
            data: {
                fileIDs: images.map(img => img.id),
            },
        })
    },
}
