import axios from 'axios'
import jwtDecode from 'jwt-decode'

const refreshToken = async (user: any) => {
    try {
        const res = await axios.post('/auth/refresh', user)
        return res.data
    } catch (err) {
        console.log(err)
    }
}
//check truoc khi goi den api co jwt
const createAxios = (user: any, dispatch: any, stateSuccess: any) => {
    const newInstance = axios.create()

    newInstance.interceptors.request.use(
        async (config) => {
            const date = new Date()
            const decodeToken: any = jwtDecode(user.accessToken)
            if (decodeToken.exp < date.getTime() / 1000) {
                const data = await refreshToken({ user: user?.userInfo?.idUser._id, refreshToken: user?.refreshToken })
                const refreshUser = {
                    ...user,
                    accessToken: data?.accessToken,
                    refreshToken: data?.refreshToken,
                }
                dispatch(stateSuccess(refreshUser))
                config.headers['token'] = 'Bearer ' + data.accessToken
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        },
    )
    return newInstance
}

export default createAxios
