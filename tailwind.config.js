module.exports = {
    theme: {},
    variants: {},
    plugins: [],
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            'src/components/**/*.vue',
            'src/layouts/**/*.vue',
            'src/pages/**/*.vue',
            'src/plugins/**/*.js',
            'nuxt.config.js',
        ],
    },
}
