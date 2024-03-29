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
export const loginUser = async (user: any, dispatch: any, navigate: any, setErr: any) => {
    dispatch(loginStart())
    try {
        const res = await axios.post('/auth/login', user)
        const checked = res.data.userInfo
        dispatch(loginSuccess(res.data))
        !checked ? navigate('/registerN') : navigate('/')
    } catch (err: any) {
        setErr(err.response.data)
        dispatch(loginFailed())
    }
}

export const registeUser = async (user: any, dispatch: any, navigate: any, setErr: any) => {
    dispatch(registerStart())
    try {
        const res = await axios.post('/auth/register', user)
        dispatch(registerSuccess(res.data._id))
        const login = await axios.post('/auth/login', user)
        dispatch(loginSuccess(login.data))
        navigate('/registerN')
    } catch (err: any) {
        setErr(err.response.data)
        dispatch(registerFailed())
    }
}

export const registerN = async (user: any, dispatch: any, navigate: any) => {
    dispatch(registerNStart())
    try {
        await axios.post('/auth/register1', user)
        navigate('/login')
        dispatch(registerNSuccess(null))
    } catch (err) {
        dispatch(registerNFailed())
    }
}

export const logOutUser = async (dispatch: any, navigate: any, id: any, accessToken: any) => {
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
