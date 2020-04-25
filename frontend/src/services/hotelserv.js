import axios from '@/plugins/axios'

const BASE_PATH = '/main/'

export default {
    userhotels: id => axios.get(`${BASE_PATH}hotel/?user=${id}`),
    createhotel: data => axios.post(`${BASE_PATH}hotel/`, data),
    gethotel: id => axios.get(`${BASE_PATH}hotel/${id}/`),
    updatehotel: (id, data) => axios.patch(`${BASE_PATH}hotel/${id}/`, data)
}