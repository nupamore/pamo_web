const { resolve } = require('path')

module.exports = async () => {
    return {
        head: {
            htmlAttrs: {
                lang: 'ko',
            },
            title: 'test',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'test',
                },
            ],
        },
        buildModules: ['@nuxtjs/composition-api'],
        /**
         * dir
         */
        css: ['@/assets/css/global.scss'],
        srcDir: resolve(__dirname, 'src'),
        plugins: ['@/plugins/vant', '@/plugins/locale.client'],
        components: true,
    }
}
