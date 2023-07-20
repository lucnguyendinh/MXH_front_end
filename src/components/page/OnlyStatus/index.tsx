import classNames from 'classnames/bind'

import styles from './OnlyStatus.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Status from '../../Item/Status'
import config from '../../../config'
import { useSelector } from 'react-redux'
import useJWT from '../../../config/useJWT'
import Video from '../../Item/Video'

const cx = classNames.bind(styles)

const OnlyStatus = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const UserInfo = user?.userInfo
    const userRegister = user?.user
    const accessToken = user?.accessToken
    const axiosJWT = useJWT()
    const [status, setStatus] = useState<any>(null)
    const [volume, setVolume] = useState<any>(0)
    useEffect(() => {
        if (!UserInfo) {
            navigate('/login')
        }
        if (userRegister) {
            navigate('/registerN')
        }
    }, [UserInfo, userRegister])

    useEffect(() => {
        const getStatus = async () => {
            try {
                const res = await axiosJWT.get(`/status/getstatusbyid/${id}`, {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setStatus(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (accessToken) getStatus()
    }, [id, accessToken])
    const timeSinceCreation = (Date.now() - Date.parse(status?.createdAt)) / 1000

    const displayTime = config.timeDefault(timeSinceCreation)

    if (!UserInfo || userRegister) {
        return <div></div>
    }
    return (
        <div className={cx('wrapper')}>
            <Status timed={displayTime} status={status} className={cx('status')}>
                <h3>{status?.content}</h3>
                {status?.img && <img className={cx('img')} style={{ width: '100%' }} src={status.img} alt="" />}
                {status?.video && <Video url={status.video} volume={volume} setVolume={setVolume} />}
            </Status>
        </div>
    )
}

export default OnlyStatus
