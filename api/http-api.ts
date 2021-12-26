import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'https://ggaekapp.herokuapp.com/api/'
    baseURL: 'https://ggaekappdocker.herokuapp.com/api/',
    withCredentials: true,
})

export default axiosInstance