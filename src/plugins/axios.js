export let axios = null

export async function api(option) {
    const res = await axios(option)
    const { code, message } = res.data

    if (code) {
        const err = new Error(message)
        err.code = code
        throw err
    } else {
        return res.data
    }
}

export default function ({ $config, $axios }, inject) {
    axios = $axios.create({
        baseURL: $config.serverUrl,
        withCredentials: true,
    })
    inject('api', api)
}
