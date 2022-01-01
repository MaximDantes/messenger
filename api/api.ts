import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://ggaekappdocker.herokuapp.com/api/',
    withCredentials: true,
})

axiosInstance.interceptors.response.use(
    response => response, async (error) => {
        const status = error.response ? error.response.status : null

        const originalRequest = error.config

        if (status === 401) {
            await axiosInstance.post('token/refresh/')

            await axiosInstance(originalRequest)
        }
    })

export default axiosInstance