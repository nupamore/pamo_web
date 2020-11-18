import { api } from './../api/axios'

export default {
    async getGuilds() {
        const guilds = await api({ url: '/api/v1/guilds' })

        return guilds.map(g => ({
            value: g.guild_id,
            label: g.guild_name,
        }))
    },
}
