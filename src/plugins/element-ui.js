import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({ app }) =>
    Vue.use(ElementUI, {
        i18n: (key, val) => app.i18n.t(key, val),
    })
