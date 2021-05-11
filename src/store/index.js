import { api } from '@/plugins/axios'
import Guild from '@/models/Guild'

export default {
    state: () => ({
        auth: {},
        guilds: [],
    }),
    getters: {
        auth(state) {
            return state.auth
        },
        guilds(state) {
            return state.guilds
        },
    },
    mutations: {
        SET_AUTH(state, obj) {
            state.auth = obj
        },
        SET_GUILDS(state, arr) {
            state.guilds = arr
        },
    },
    actions: {
        async getAuth({ commit }) {
            try {
                const { data } = await api({ url: '/api/v1/me' })
                commit('SET_AUTH', data)
                return data
            } catch (e) {
                console.error(e)
            }
        },
        async getGuilds({ state, commit }) {
            const myId = state.auth.id
            const { data } = await api({ url: '/api/v1/guilds' })
            const guilds = data.map(g => new Guild(g, myId))
            commit('SET_GUILDS', guilds)
            return guilds
        },
    },
}
