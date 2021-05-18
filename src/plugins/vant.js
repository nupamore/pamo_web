import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Toast, Dialog } from 'vant'

export default ({ app }) => {
    Vue.use(Vant)
    Vue.use(Toast)
    Vue.use(Dialog)
}
