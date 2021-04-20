<template>
    <div id="layout">
        <header>
            <van-image
                round
                width="40"
                height="40"
                :src="`https://cdn.discordapp.com/avatars/${me.id}/${me.avatar}.png?size=40`"
            />
            <span>{{ me.username }}</span>
        </header>
        <main>
            <Nuxt />
        </main>
    </div>
</template>

<script>
export default {
    computed: {
        me() {
            return this.$store.getters['auth']
        },
    },
    beforeMount() {
        if (!this.me.id) {
            this.$store.dispatch('getAuth')
        }
    },
}
</script>

<style lang="scss">
#layout > header {
    padding: 14px 12px;
    & > .van-image,
    & > span {
        display: inline-block;
        vertical-align: middle;
    }
}
</style>
