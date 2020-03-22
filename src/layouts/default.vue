<template>
    <el-container>
        <el-header>
            <the-top-nav />
        </el-header>
        <el-main>
            <nuxt />
        </el-main>
    </el-container>
</template>

<script>
import TheTopNav from '@/components/TheTopNav'
export default {
    middleware: ['init'],
    components: {
        TheTopNav,
    },
    beforeCreate() {
        this.$store.dispatch('getUserInfo')
    },
}
</script>

<style lang="scss">
html,
body {
    font-size: 15px;
    font-family: 'PingFang TC', 'メイリオ', 'Noto Sans Korean', sans-serif;

    @media screen and (max-width: 768px) {
        margin: 0;
        font-size: 10px;
    }
}
.el-container {
    max-width: 1600px;
    margin: 0 auto;
}
</style>
