<template>
    <div>
        <p v-for="photo in photos" :key="photo.id">
            {{ photo }}
        </p>
    </div>
</template>

<style lang="scss"></style>

<script>
import photoService from '@/services/photo'
export default {
    async asyncData() {
        return {
            photos: await photoService.getPhotosList(),
        }
    },
}
</script>
