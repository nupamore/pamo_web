<template>
    <el-row>
        <el-col :xs="12" :sm="20" :md="21"> </el-col>
        <el-col :xs="12" :sm="4" :md="3">
            <el-menu v-if="!userInfo.id">
                <el-menu-item class="btn-profile" @click="login">
                    <el-image
                        fit="cover"
                        src="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg"
                    ></el-image>
                    <div class="login">{{ $t('UI.LOGIN') }}</div>
                </el-menu-item>
            </el-menu>
            <el-menu v-else>
                <el-popconfirm
                    :title="$t('UI.QUESTION.LOGOUT')"
                    :confirmButtonText="$t('UI.CONFIRM')"
                    :cancelButtonText="$t('UI.CANCEL')"
                    @onConfirm="logout"
                >
                    <el-menu-item class="btn-profile" slot="reference">
                        <el-image
                            fit="cover"
                            :src="
                                `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.jpg`
                            "
                        ></el-image>
                        <div class="name">{{ userInfo.username }}</div>
                        <div class="code">
                            {{ '#' + userInfo.discriminator }}
                        </div>
                    </el-menu-item>
                </el-popconfirm>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    computed: {
        userInfo() {
            return this.$store.getters.userInfo
        },
    },
    methods: {
        login() {
            location.href = 'http://localhost:3001/auth/discord'
        },
        logout() {
            this.$store.dispatch('logout')
        },
    },
    beforeMounted() {
        this.findActiveIndex()
        this.$store.dispatch('getUserInfo')
    },
}
</script>

<style lang="scss">
.btn-profile {
    max-width: 180px;
    margin: 0 0 0 auto;
    font-size: 20px;
    .el-image {
        float: left;
        width: 50px;
        height: 50px;
        margin: 4px 10px;
    }
    .name {
        font-size: 18px;
        line-height: 2em;
    }
    .code {
        font-size: 12px;
        line-height: 1em;
    }
}
</style>
