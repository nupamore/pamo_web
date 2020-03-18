const lang = require('./src/lang')

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'workstation',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Virnect Platform',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    /*
     ** Customize style
     */
    css: ['@/assets/style/common.scss'],
    loading: { color: '#1b293e' },
    /**
     * Plugins
     */
    plugins: ['@/plugins/element-ui'],
    modules: [['nuxt-i18n', lang]],
    /**
     * dir
     */
    srcDir: 'src/',
    modulesDir: ['../../node_modules'],
    /**
     * env
     */
    env: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        SSL_ENV: JSON.stringify(process.env.SSL_ENV),
    },
}
