<template>
    <main class="px-4">
        <div class="py-2">
            <div class="inline-block pr-3">Guilds</div>
            <Select :list="guilds" @changed="guildChanged" />
        </div>
        <div class="py-2">
            <div class="inline-block pr-3">Uploaders</div>
            <Select :list="uploaders" />
        </div>
        <div class="flex flex-wrap py-10 lg:-mx-2">
            <Card class="w-1/2 lg:w-1/4 lg:mx-2" />
            <Card class="w-1/2 lg:w-1/4 lg:mx-2" />
            <Card class="w-1/2 lg:w-1/4 lg:mx-2" />
        </div>
    </main>
</template>

<script>
import Select from '~/components/Select.vue'
import Card from '~/components/Card.vue'
import guildService from '~/services/guild'
import imageService from '~/services/image'

export default {
    components: { Select, Card },
    data: () => ({
        guildId: null,
        uploaderId: null,

        guilds: [],
        uploaders: [],
    }),
    async beforeMount() {
        this.guilds = await guildService.getGuilds()
    },
    methods: {
        async guildChanged(id) {
            this.guildId = id
            this.uploaders = await imageService.getUploaders(id)
        },
    },
}
</script>
