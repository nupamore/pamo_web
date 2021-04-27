import { api } from '@/plugins/axios'

export default {
    async getUploaders(guildId) {
        const { data } = await api({
            url: `/api/v1/guilds/${guildId}/uploaders`,
        })
        return data
    },
}
