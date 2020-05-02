import axios from 'axios'

export default axios.create({baseURL: 'http://localhost:8000/'})

export const BASE_API_PATH = '/main/', ACCESS_TOKEN_LIFETIME = 5 * 60 * 1000