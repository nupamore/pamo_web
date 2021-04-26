<template>
    <div></div>
</template>

<script>
export default {
    beforeCreate() {
        const auth = this.$store.getters['auth']
        if (auth.id) this.$router.replace('/guild')
    },
}
</script>
