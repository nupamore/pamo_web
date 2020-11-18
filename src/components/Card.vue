<template>
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img
            class="w-full"
            src="https://tailwindcss.com/img/card-top.jpg"
            alt="Sunset in the mountains"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        thumb: {
            type: String,
            default: () => '',
        },
        origin: {
            type: String,
            default: () => '',
        },
    },
})
</script>
