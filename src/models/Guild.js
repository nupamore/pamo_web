import Model from '@/models/Model'

export default class Guild extends Model {
    constructor(_) {
        super()
        this.id = _.guild_id
        this.name = _.guild_name
        this.master = _.reg_user
        this.joinDate = new Date(_.reg_date)
    }
}
