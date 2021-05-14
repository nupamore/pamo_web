<template>
    <div id="guild-list">
        <van-search v-model="searchGuild" placeholder="Guild Name" />
        <van-skeleton :row="3" :loading="!guilds.length">
            <van-cell-group>
                <van-cell
                    v-for="g in filterGuilds()"
                    :key="g.id"
                    is-link
                    @click="$router.push(`/guild/${g.id}`)"
                >
                    <template #title>
                        <van-icon v-if="g.isMaster" name="manager" />
                        <span>{{ g.name }}</span>
                    </template>
                </van-cell>
            </van-cell-group>
        </van-skeleton>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchGuild: '',
        }
    },
    computed: {
        guilds() {
            return this.$store.getters['guilds']
        },
    },
    async beforeMount() {
        if (!this.guilds.length) this.$store.dispatch('getGuilds')
    },
    methods: {
        filterGuilds() {
            return this.guilds.filter(g =>
                g.name.toLowerCase().includes(this.searchGuild.toLowerCase()),
            )
        },
    },
}
</script>

<style lang="scss">
#guild-list {
    .van-cell__title {
        i,
        span {
            vertical-align: middle;
        }
    }
}
</style>
