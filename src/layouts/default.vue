<template>
    <div id="layout">
        <header>
            <van-image round width="40" height="40" :src="avatar" />
            <span>{{ me.username }}</span>
            <van-button v-if="me.id" size="small" @click="logout">
                LOGOUT
            </van-button>
            <van-button v-else size="small" @click="login">LOGIN</van-button>
        </header>

        <main>
            <Nuxt />
        </main>
    </div>
</template>

<script>
import { avatar } from '@/models/Image'

export default {
    async middleware({ store }) {
        if (!store.getters['auth'].id) {
            await store.dispatch('getAuth')
        }
    },
    computed: {
        me() {
            return this.$store.getters['auth']
        },
        avatar() {
            return this.me.id ? avatar(this.me.id, this.me.avatar) : ''
        },
    },
    methods: {
        login() {
            location.href = `${this.$config.serverUrl}/api/auth/login`
        },
        async logout() {
            await this.$api({ url: '/api/auth/logout' })
            location.href = '/'
        },
    },
}
</script>

<style lang="scss">
#layout > header {
    padding: 14px 12px;
    & > * {
        display: inline-block;
        vertical-align: middle;
    }
    .van-button {
        float: right;
        margin-top: 4px;
    }
}
</style>
