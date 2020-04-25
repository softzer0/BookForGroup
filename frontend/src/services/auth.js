import axios from '@/plugins/axios'

const BASE_PATH = '/auth/'

export default {
    login: data => axios.post(`${BASE_PATH}login/`, data),
    register: data => axios.post(`${BASE_PATH}registration/`, data),
    userInfo: () => axios.get(`${BASE_PATH}user/`),
    logout: () => axios.post(`${BASE_PATH}logout/`),
    completeUser: (id, data) => axios.patch(`${BASE_PATH}user/${id}/`, data),
}