import axios from 'axios'

const BASE_URL =  'http://10.0.2.2:3000/'     

const axiosClient = () => {
    return axios.create({
        baseURL: BASE_URL
    })
}

export default axiosClient