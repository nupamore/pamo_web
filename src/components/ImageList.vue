<template>
    <van-row class="image-list">
        <van-col v-for="image in images" :key="image.origin" span="12">
            <van-image
                width="100%"
                height="18vh"
                fit="cover"
                :src="image.origin"
                show-loading
            >
                <!-- <template #loading>
                    <Blur :hash="image.blur" />
                </template> -->
            </van-image>
        </van-col>
    </van-row>
</template>

<script>
export default {
    props: {
        images: Array,
    },
}
</script>
