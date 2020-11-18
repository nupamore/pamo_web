import { api } from './../api/axios'

export default {
    async getUploaders(guildId) {
        const uploaders = await api({
            url: `/api/v1/guilds/${guildId}/uploaders`,
        })

        return uploaders.map(u => ({
            value: u.id,
            label: u.name,
        }))
    },
}
