import Model from '@/models/Model'

export function origin(channelId, fileId, filename) {
    return `https://cdn.discordapp.com/attachments/${channelId}/${fileId}/${filename}`
}

export function thumb(channelId, fileId, filename) {
    const query = 'width=400&height=240'
    return `https://media.discordapp.net/attachments/${channelId}/${fileId}/${filename}?${query}`
}

export function avatar(userId, avatar) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png?size=40`
}

export default class Image extends Model {
    constructor(_) {
        super()
        this.blur = _.blurhash
        this.thumb = thumb(_.channel_id, _.file_id, _.file_name)
        this.origin = origin(_.channel_id, _.file_id, _.file_name)
        this.owner = _.owner_id
        this.avatar = avatar(_.owner_id, _.owner_avatar)
        this.date = _.reg_date
    }
}
