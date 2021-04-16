export default class Model {
    /**
     * fix POJO warning
     */
    toJSON() {
        if (!process.server) return this
        else {
            return Object.getOwnPropertyNames(this).reduce((a, b) => {
                a[b] = this[b]
                return a
            }, {})
        }
    }
}
