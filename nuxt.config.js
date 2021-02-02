const { resolve } = require('path')

module.exports = async () => {
    return {
        buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/composition-api'],
        tailwindcss: {
            cssPath: '~/assets/css/main.css',
            configPath: 'tailwind.config.js',
            exposeConfig: false,
            config: {},
        },
        /**
         * dir
         */
        srcDir: resolve(__dirname, 'src'),
    }
}
