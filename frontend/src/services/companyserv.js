import axios from '@/plugins/axios'

const BASE_PATH = '/main/'

export default {
    createusercompany: data => axios.post(`${BASE_PATH}company/`, data),
    getusercompany: () => axios.get(`${BASE_PATH}company/`),
    updateusercompany: data => axios.patch(`${BASE_PATH}company/`, data)
}