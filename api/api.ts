import axios from 'axios'
import config from '../config'

const axiosInstance = axios.create({
    baseURL: `https://${config.serverAddress}/api/`,
    withCredentials: true,
})

axiosInstance.interceptors.response.use(
    response => response, async (error) => {
        const status = error.response ? error.response.status : null

        const originalRequest = error.config

        if (status === 401) {
            await axiosInstance.post('token/refresh/')

            const response = await axiosInstance(originalRequest)

            return response.data
        }
    })

export default axiosInstance