import axios from '@/plugins/axios'

export default {
    login: data => axios.post('/login/', data),
    register: data => axios.post('/registration/', data),
    userInfo: () => axios.get('/user/')
}