import axios, { BASE_API_PATH } from '@/plugins/axios'

const BASE_PATH = `${BASE_API_PATH}accommodation/`

export default {
    get_hotel_accommodations: id => axios.get(`${BASE_PATH}?hotel=${id}`),
    create_accommodation: data => axios.post(`${BASE_PATH}`, data),
    get_accommodation: id => axios.get(`${BASE_PATH}${id}/`),
    update_accommodation: (id, data) => axios.patch(`${BASE_PATH}${id}/`, data)
}