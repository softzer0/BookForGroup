import axios from '@/plugins/axios'

const BASE_PATH = '/auth/'

export default {
    login: data => axios.post(`${BASE_PATH}login/`, data),
    refresh_token: refresh => axios.post(`${BASE_PATH}token/refresh/`, { refresh }),
    register: data => axios.post(`${BASE_PATH}registration/`, data),
    userInfo: () => axios.get(`${BASE_PATH}user/`),
    logout: refresh => axios.post(`${BASE_PATH}logout/`, { refresh }),
    update: data => axios.patch(`${BASE_PATH}user/`, data),
}