import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import Me from '../../Item/Personal/me'
import Other from '../../Item/Personal/other'

const Personal = () => {
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const UserInfo = user?.userInfo
    const userRegister = user?.user
    const { id } = useParams()

    useEffect(() => {
        if (!UserInfo) {
            navigate('/login')
        }
        if (userRegister) {
            navigate('/registerN')
        }
    }, [UserInfo, userRegister])
    if (!UserInfo || userRegister) {
        return <div></div>
    }
    return <div className="wrapper">{user?.userInfo?._id === id ? <Me /> : <Other />}</div>
}
export default Personal
