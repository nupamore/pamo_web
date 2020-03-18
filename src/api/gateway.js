import API from '@/api/API'
import axios from '@/plugins/axios'

export default async function api(name, option = {}) {
    if (!API[name]) {
        throw new Error(`API not found '${name}'`)
    }
    let [method, uri] = API[name]
    let { route, params } = option

    // replace route
    method = method.toLowerCase()
    uri = !route
        ? uri
        : Object.entries(route).reduce((u, q) => {
              return u.replace(`{${q[0]}}`, q[1])
          }, uri)
    params = method === 'post' ? params : { params }

    const response = await axios[method](uri, params)
    return response.data
}
