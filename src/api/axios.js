import axios from 'axios'

const customAxios = axios.create({
    baseURL: 'http://localhost:3003',
    withCredentials: true,
})

export async function api(option) {
    const res = await customAxios(option)
    const { code, message, data } = res.data

    if (code) {
        const err = new Error(message)
        err.code = code
        throw err
    } else {
        return data
    }
}
