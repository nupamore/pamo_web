import dayjs from 'dayjs'
import filters from '@/services/filters'

export function Photo(image) {
    const imgUrl = filters.imgUrl(
        image.channel_id,
        image.file_id,
        image.file_name,
    )
    return {
        userName: image.owner_name,
        userId: image.owner_id,
        serverId: image.guild_id,
        fileId: image.file_id,
        date: dayjs(image.reg_date).format('YYYY-MM-DD'),
        origin: imgUrl,
        thumb: filters.origin2Thumb(imgUrl),
    }
}
