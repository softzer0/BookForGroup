import axios, { BASE_API_PATH } from '@/plugins/axios'

const BASE_PATH = `${BASE_API_PATH}room/`

export default {
    get_hotel_rooms: id => axios.get(`${BASE_PATH}?hotel=${id}`),
    create_room: data => axios.post(`${BASE_PATH}`, data),
    get_room: id => axios.get(`${BASE_PATH}${id}/`),
    update_room: (id, data) => axios.patch(`${BASE_PATH}${id}/`, data)
}