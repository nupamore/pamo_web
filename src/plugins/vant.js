import Vue from 'vue'
import Vant from 'vant'
import { Lazyload } from 'vant'
import 'vant/lib/index.css'

export default ({ app }) => {
    Vue.use(Vant)
    Vue.use(Lazyload)
}
