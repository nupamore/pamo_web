import { api } from '@/plugins/axios'

export default {
    state: () => ({
        auth: {},
    }),
    getters: {
        auth(state) {
            return state.auth
        },
    },
    mutations: {
        SET_AUTH(state, obj) {
            state.auth = obj
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
    },
}
