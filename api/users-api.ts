import axiosInstance from './http-api'

const usersApi = {
    get: async (userId: number) => {
        const response = await axiosInstance.get(`users/${userId}`)

        return response.data
    }
}

export default usersApi