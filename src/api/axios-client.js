import axios from 'axios'

const BASE_URL = 'http://api.autovyn.in:3000/'     

const axiosClient = () => {
    return axios.create({
        baseURL: BASE_URL
    })
}

export default axiosClient