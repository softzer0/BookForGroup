import axios from '@/plugins/axios'

const BASE_PATH = '/auth/'

export default {
    register: data => axios.post(`${BASE_PATH}registration/`, data),
    login: data => axios.post(`${BASE_PATH}login/`, data),
    refresh_token: refresh => axios.post(`${BASE_PATH}token/refresh/`, { refresh }),
    logout: refresh => axios.post(`${BASE_PATH}logout/`, { refresh }),
    update: data => axios.patch(`${BASE_PATH}user/`, data),
    user_info: () => axios.get(`${BASE_PATH}user/`),
}