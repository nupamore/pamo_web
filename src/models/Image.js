import Model from '@/models/Model'

export function origin(channelId, fileId, filename) {
    return `https://cdn.discordapp.com/attachments/${channelId}/${fileId}/${filename}`
}

export function thumb(
    channelId,
    fileId,
    filename,
    query = 'width=400&height=240',
) {
    return `https://media.discordapp.net/attachments/${channelId}/${fileId}/${filename}?${query}`
}

export function avatar(userId, avatar) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png?size=40`
}

export default class Image extends Model {
    constructor(_) {
        super()
        this.type = /\.(mov|mp4)$/.test(_.file_name) ? 'video' : 'image'
        this.blur = _.blurhash
        this.origin = origin(_.channel_id, _.file_id, _.file_name)
        this.thumb =
            this.type === 'video'
                ? thumb(
                      _.channel_id,
                      _.file_id,
                      _.file_name,
                      'format=jpeg&width=400&height=240',
                  )
                : thumb(_.channel_id, _.file_id, _.file_name)
        this.owner = {
            id: _.owner_id,
            name: _.owner_name,
            avatar: avatar(_.owner_id, _.owner_avatar),
        }
        this.date = new Date(_.reg_date)
    }
}
