import axios from 'axios'

const axio = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 3000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

export default axio
