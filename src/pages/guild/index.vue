<template>
    <div>
        <van-search v-model="searchGuild" placeholder="Guild Name" />
        <van-skeleton :row="3" :loading="!guilds.length">
            <van-cell-group>
                <van-cell
                    v-for="g in filterGuilds()"
                    :key="g.id"
                    :value="g.name"
                    @click="$router.push(`/guild/${g.id}`)"
                />
            </van-cell-group>
        </van-skeleton>
    </div>
</template>

<script>
import guildService from '~/services/guild'

export default {
    data() {
        return {
            guilds: [],
            searchGuild: '',
        }
    },
    async beforeMount() {
        this.guilds = await guildService.getGuilds()
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
