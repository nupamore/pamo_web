import api from '@/api/gateway'

export default {
    state() {
        return {
            userInfo: {},
        }
    },
    getters: {
        userInfo: state => state.userInfo,
    },
    mutations: {
        SET_USER_INFO(state, info) {
            state.userInfo = info
        },
    },
    actions: {
        async getUserInfo(context) {
            const data = await api('GET_PROFILE')
            context.commit('SET_USER_INFO', data)
        },
        async logout() {
            await api('LOGOUT')
            location.reload()
        },
    },
}
