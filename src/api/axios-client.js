import axios from 'axios'

const BASE_URL =  'http://192.168.1.123:3000'     

const axiosClient = () => {
    return axios.create({
        baseURL: BASE_URL
    })
}

export default axiosClient