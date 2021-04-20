import { api } from '@/plugins/axios'
import Image from '@/models/Image'

export default {
    async searchImages(guildId, page) {
        const { data, pageMeta } = await api({
            url: `/api/v1/guilds/${guildId}/images`,
            params: {
                page,
                size: 8,
            },
        })
        return {
            images: data.map(i => new Image(i)),
            pageMeta,
        }
    },
}
