import axios from 'axios'
import config from '../config'
import {ErrorMessages} from '../store/exceptions'

const axiosInstance = axios.create({
    baseURL: `https://${config.serverAddress}/api/`,
    withCredentials: true,
})

axiosInstance.interceptors.response.use(response => response, async (error) => {
    const status = error.response?.status

    if (status === 401) throw Error(ErrorMessages.tokenExpired)
})

export default axiosInstance