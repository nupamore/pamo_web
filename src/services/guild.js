import { api } from '@/plugins/axios'

export default {
    async getGuilds() {
        const { data } = await api({ url: '/api/v1/guilds' })

        return data.map(g => ({
            id: g.guild_id,
            name: g.guild_name,
        }))
    },
    async getUploaders(guildId) {
        const { data } = await api({
            url: `/api/v1/guilds/${guildId}/uploaders`,
        })
        return data
    },
}
