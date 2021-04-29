<template>
    <div id="index">
        <van-image round width="100" height="100" src="favicon.ico" />
        <h2>Pamo_bot</h2>
        <p>Web archive</p>
    </div>
</template>

<script>
export default {
    beforeCreate() {
        const auth = this.$store.getters['auth']
        if (auth.id) this.$router.replace('/guild')
    },
}
</script>

<style lang="scss">
#index {
    margin: 100px 0;
    text-align: center;
    p {
        margin-top: -10px;
    }
}
</style>
