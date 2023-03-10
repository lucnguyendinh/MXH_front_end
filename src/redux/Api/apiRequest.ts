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
    commentFail,
    commentStart,
    commentSuccess,
    getStatusFail,
    getStatusStart,
    getStatusSuccess,
    likeFail,
    likeStart,
    likeSuccess,
    unLikeFail,
    unLikeStart,
    unLikeSuccess,
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

export const logOutUser = async (
    dispatch: any,
    navigate: any,
    id: any,
    accessToken: any,
) => {
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

export const comment = async (content: any, dispatch: any) => {
    dispatch(commentStart())
    try {
        await axios.post('/status/comment', content)
        dispatch(commentSuccess)
    } catch (err) {
        dispatch(commentFail())
    }
}

export const like = async (like: any, dispatch: any) => {
    dispatch(likeStart())
    try {
        await axios.post('/status/like', like)
        dispatch(likeSuccess())
    } catch (err) {
        dispatch(likeFail())
    }
}

export const unLike = async (dispatch: any, id: any) => {
    dispatch(unLikeStart())
    try {
        await axios.delete('/status/unlike/' + id, id)
        dispatch(unLikeSuccess())
    } catch (err) {
        dispatch(unLikeFail())
    }
}
