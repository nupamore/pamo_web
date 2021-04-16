<template>
    <div>
        {{ hash }}
        <!-- <canvas ref="canvas" width="100" height="60" /> -->
    </div>
</template>

<script>
import * as blurhash from 'blurhash-wasm'

export default {
    props: {
        hash: {
            type: String,
            default: () => '',
        },
    },
    beforeMount() {
        // const [WIDTH, HEIGHT] = [50, 30]
        // const pixels = blurhash.decode(this.hash, WIDTH, HEIGHT)
        // const asClamped = new Uint8ClampedArray(pixels)
        // const imageData = new ImageData(asClamped, WIDTH, HEIGHT)
        // const ctx = this.$refs.canvas.getContext('2d')
        // ctx.putImageData(imageData, 0, 0)
    },
}
</script>
