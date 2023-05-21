import axios from 'axios'
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerNFailed,
    registerNStart,
    registerNSuccess,
    registerStart,
    registerSuccess,
} from '../Slice/authSlice'
import {
    getStatusFail,
    getStatusStart,
    getStatusSuccess,
    upStatusStart,
    upStatusSuccess,
    upStatusFail,
} from '../Slice/statusSlice'

export const loginUser = async (user: any, dispatch: any, navigate: any) => {
    dispatch(loginStart())
    try {
        const res = await axios.post('/auth/login', user)
        const checked = res.data.userInfo
        dispatch(loginSuccess(res.data))
        !checked ? navigate('/registerN') : navigate('/')
    } catch (err: any) {
        dispatch(loginFailed(err.response.data))
    }
}

export const registeUser = async (user: any, dispatch: any, navigate: any) => {
    dispatch(registerStart())
    try {
        const res = await axios.post('/auth/register', user)
        dispatch(registerSuccess(res.data._id))
        const login = await axios.post('/auth/login', user)
        dispatch(loginSuccess(login.data))
        navigate('/registerN')
    } catch (err) {
        dispatch(registerFailed())
    }
}

export const registerN = async (user: any, dispatch: any, navigate: any) => {
    dispatch(registerNStart())
    try {
        await axios.post('/auth/register1', user)
        dispatch(registerNSuccess())
        navigate('/login')
    } catch (err) {
        dispatch(registerNFailed())
    }
}

export const logOutUser = async (dispatch: any, navigate: any, id: any, accessToken: any, axiosJWT: any) => {
    dispatch(logOutStart())
    try {
        await axios.post('/auth/logout', id, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(logOutSuccess())
        navigate('/login')
    } catch (err) {
        dispatch(logOutFailed())
    }
}

export const getStatus = async (dispatch: any) => {
    dispatch(getStatusStart())
    try {
        const status = await axios.get('/status/getstatus')
        dispatch(getStatusSuccess(status.data))
    } catch (err) {
        dispatch(getStatusFail())
    }
}

export const upStatus = async (status: any, dispatch: any) => {
    dispatch(upStatusStart())
    try {
        await axios.post('/status/upstatus', status)
        dispatch(upStatusSuccess())
    } catch (err) {
        dispatch(upStatusFail())
    }
}
