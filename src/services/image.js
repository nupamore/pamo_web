import { api, axios } from '@/plugins/axios'
import Image from '@/models/Image'

let cancelSource = null

export default {
    async searchImages(guildId, owner, page) {
        if (cancelSource) cancelSource.cancel()
        cancelSource = axios.CancelToken.source()

        const { data, pageMeta } = await api({
            cancelToken: cancelSource.token,
            url: `/api/v1/guilds/${guildId}/images`,
            params: {
                owner,
                page,
                size: 8,
            },
        })
        return {
            images: data ? data.map(i => new Image(i)) : [],
            pageMeta,
        }
    },
}
