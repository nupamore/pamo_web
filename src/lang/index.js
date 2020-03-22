module.exports = {
    locales: ['en', 'ja', 'ko'],
    defaultLocale: 'en',
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
    },
    vueI18n: {
        fallbackLocale: 'en',
        messages: {
            en: require('./en'),
            ja: require('./ja'),
            ko: require('./ko'),
        },
    },
}
