import axios from '@/plugins/axios'

export default {
    login: data => axios.post('/login/', data),
    userInfo: () => axios.get('/user/')
}