import Home from './pages/Home.vue'
import Images from './pages/Images.vue'
import NotFound from './pages/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
    { path: '/', component: Home, meta: { title: 'Home' } },
    { path: '/images', component: Images, meta: { title: 'Images' } },
    { path: '/:path(.*)', component: NotFound },
]
