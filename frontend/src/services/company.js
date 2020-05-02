import axios, { BASE_API_PATH } from '@/plugins/axios'

const BASE_PATH = `${BASE_API_PATH}company/`

export default {
    create_user_company: data => axios.post(`${BASE_PATH}`, data),
    get_user_company: () => axios.get(`${BASE_PATH}`),
    update_user_company: data => axios.patch(`${BASE_PATH}`, data)
}
