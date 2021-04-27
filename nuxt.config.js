const { resolve } = require('path')

module.exports = async () => {
    return {
        head: {
            htmlAttrs: {
                lang: 'ko',
            },
            title: 'Pamo_bot',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Pamo_bot web archive',
                },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
        css: ['@/assets/css/global.scss'],
        srcDir: resolve(__dirname, 'src'),
        modules: ['@nuxtjs/axios'],
        buildModules: ['@nuxtjs/composition-api'],
        plugins: [
            '@/plugins/axios',
            '@/plugins/vant',
            '@/plugins/locale.client',
            '@/plugins/blurhash.client',
        ],
        components: true,
        publicRuntimeConfig: {
            serverUrl:
                process.env.NODE_ENV === 'development'
                    ? 'http://localhost:3003'
                    : 'https://bot.nupa.moe',
        },
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
    }
}
