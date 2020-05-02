import axios, { BASE_API_PATH } from '@/plugins/axios'

const BASE_PATH = `${BASE_API_PATH}hotel/`

export default {
    get_user_hotels: id => axios.get(`${BASE_PATH}?user=${id}`),
    create_hotel: data => axios.post(`${BASE_PATH}`, data),
    get_hotel: id => axios.get(`${BASE_PATH}${id}/`),
    update_hotel: (id, data) => axios.patch(`${BASE_PATH}${id}/`, data)
}