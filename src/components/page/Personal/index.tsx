import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Me from '../../Item/Personal/me'
import Other from '../../Item/Personal/other'

const Personal = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const { id } = useParams()

    return <div className="wrapper">{user?.userInfo._id === id ? <Me /> : <Other />}</div>
}
export default Personal
