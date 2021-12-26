import axiosInstance from './http-api'

const authApi = {
    auth: async (email: string, password: string) => {
        const response = await axiosInstance.post('token/', {
            email: 'ggaek@ggaek.by',
            password: 'head'
        })

        return response.data
    }
}

export default authApi