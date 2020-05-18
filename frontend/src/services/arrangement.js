import axios, { BASE_API_PATH } from '@/plugins/axios'

const BASE_PATH = `${BASE_API_PATH}arrangement/`

export default {
    get_accommodation_arrangements: id => axios.get(`${BASE_PATH}?accommodation=${id}`),
    get_arrangement: id => axios.get(`${BASE_PATH}${id}/`),
    create_arrangement: data => axios.post(`${BASE_PATH}`, data),
    update_arrangement: (id, data) => axios.patch(`${BASE_PATH}${id}/`, data),
    delete_arrangement: (id) => axios.delete(`${BASE_PATH}${id}/`)
}