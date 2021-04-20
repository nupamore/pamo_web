export default async (context, inject) => {
    const { decode } = await import('blurhash-wasm')
    inject('blurhash', decode)
}
