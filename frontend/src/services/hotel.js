import axios, { BASE_API_PATH } from '@/plugins/axios'

const BASE_PATH = `${BASE_API_PATH}hotel/`

export default {
    get_user_hotels: id => axios.get(`${BASE_PATH}?user=${id}`),
    get_filtered_hotel: (from, until, json_filters) => axios.get(`${BASE_PATH}`, {params: { from, until, json_filters }}),
    create_hotel: data => axios.post(`${BASE_PATH}`, data),
    get_hotel: id => axios.get(`${BASE_PATH}${id}/`),
    update_hotel: (id, data) => axios.patch(`${BASE_PATH}${id}/`, data),
    delete_hotel: id => axios.delete(`${BASE_PATH}${id}/`)
}