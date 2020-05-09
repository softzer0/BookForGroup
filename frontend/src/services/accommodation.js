import axios, { BASE_API_PATH } from '@/plugins/axios'

const BASE_PATH = `${BASE_API_PATH}accommodation/`

export default {
    get_hotel_accommodations: id => axios.get(`${BASE_PATH}?hotel=${id}`),
    get_filtered_accommodation: data => axios.get(`${BASE_PATH}?json_filters=${encodeURIComponent(JSON.stringify(data))}`),
    get_accommodation: id => axios.get(`${BASE_PATH}${id}/`),
    create_accommodation: data => axios.post(`${BASE_PATH}`, data),
    update_accommodation: (id, data) => axios.patch(`${BASE_PATH}${id}/`, data)
}