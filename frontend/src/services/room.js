import axios from '@/plugins/axios'

const BASE_PATH = '/main/'

export default {
    hotelrooms: id => axios.get(`${BASE_PATH}room/?hotel=${id}`),
    createroom: data => axios.post(`${BASE_PATH}room/`, data),
    getroom: id => axios.get(`${BASE_PATH}room/${id}/`),
    updateroom: (id, data) => axios.patch(`${BASE_PATH}room/${id}/`, data)
}