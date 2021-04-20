<template>
    <div>
        <a :href="`${$config.serverUrl}/api/auth/login`">login</a>
    </div>
</template>

<script>
export default {
    async beforeMount() {
        try {
            await this.$store.dispatch('getAuth')
            this.$router.replace('/guild')
        } catch (e) {
            console.log(e)
        }
    },
}
</script>
