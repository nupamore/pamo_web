import Model from '@/models/Model'

function origin({ channel_id, file_id, file_name }) {
    return `https://cdn.discordapp.com/attachments/${channel_id}/${file_id}/${file_name}`
}

function thumb({ channel_id, file_id, file_name }) {
    const query = 'width=200&height=120'
    return `https://media.discordapp.net/attachments/${channel_id}/${file_id}/${file_name}?${query}`
}

function avatar({ owner_id, owner_avatar }) {
    return `https://cdn.discordapp.com/avatars/${owner_id}/${owner_avatar}.png?size=64`
}

export default class Image extends Model {
    constructor(_) {
        super()
        this.blur = _.blurhash
        this.thumb = thumb(_)
        this.origin = origin(_)
        this.owner = _.owner_id
        this.avatar = avatar(_)
        this.date = _.reg_date
    }
}
