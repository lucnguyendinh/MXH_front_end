import { useSelector, useDispatch } from 'react-redux'
import config from '.'
import { loginSuccess } from '../redux/Slice/authSlice'

const useJWT = () => {
    const dispatch = useDispatch()

    const user = useSelector((state: any) => state.auth.login.currentUser)

    return config.createAxios(user, dispatch, loginSuccess)
}

export default useJWT
