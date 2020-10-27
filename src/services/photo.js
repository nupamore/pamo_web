import api from '@/api/gateway'
import { Photo } from '@/models/photo'

export default {
    async getPhotosList() {
        const { data } = await api('GET_IMAGES', {
            route: {
                guildId: '646589895321845772',
            },
            params: {
                page: 1,
            },
        })
        return {
            photoList: data.images.map(image => Photo(image)),
            total: data.total,
        }
    },
}
