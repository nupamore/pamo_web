<template>
    <div class="blur">
        <canvas ref="canvas" :width="WIDTH" :height="HEIGHT" />
    </div>
</template>

<script>
export default {
    props: {
        hash: {
            type: String,
            default: () => '',
        },
    },
    data() {
        return {
            WIDTH: 50,
            HEIGHT: 30,
        }
    },
    mounted() {
        if (!this.hash) return false

        const pixels = this.$blurhash(this.hash, this.WIDTH, this.HEIGHT)
        const asClamped = new Uint8ClampedArray(pixels)
        const imageData = new ImageData(asClamped, this.WIDTH, this.HEIGHT)
        const ctx = this.$refs.canvas.getContext('2d')
        ctx.putImageData(imageData, 0, 0)
    },
}
</script>

<style lang="scss">
.blur,
.blur > canvas {
    width: 100%;
    height: 100%;
}
</style>
