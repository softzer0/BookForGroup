import axios from 'axios'

const baseURL = 'http://localhost:8000/'

export default axios.create({ baseURL })

export const accessTokenLifetime = 5 * 60 * 1000