<template>
    <main class="px-4">
        <div class="py-2">
            <div class="inline-block pr-3">Guilds</div>
            <Select :list="guilds" />
        </div>
        <div class="py-2">
            <div class="inline-block pr-3">Uploaders</div>
            <Select :list="guilds" />
        </div>
        <div class="flex flex-wrap py-10 lg:-mx-2">
            <Card class="w-1/2 lg:w-1/4 lg:mx-2" />
            <Card class="w-1/2 lg:w-1/4 lg:mx-2" />
            <Card class="w-1/2 lg:w-1/4 lg:mx-2" />
        </div>
    </main>
</template>

<script>
import { defineComponent } from 'vue'

import Select from './../components/Select.vue'
import Card from './../components/Card.vue'

export default defineComponent({
    components: { Select, Card },
    data: () => ({
        guilds: [
            { value: 'a', label: 'apple' },
            { value: 'b', label: 'banana' },
        ],
    }),
})
</script>
