import classNames from 'classnames/bind'

import styles from './OnlyStatus.module.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Status from '../../Item/Status'
import config from '../../../config'
import { useSelector } from 'react-redux'
import useJWT from '../../../config/useJWT'
import Video from '../../Item/Video'

const cx = classNames.bind(styles)

const OnlyStatus = () => {
    const { id } = useParams()
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const axiosJWT = useJWT()
    const [status, setStatus] = useState<any>(null)
    useEffect(() => {
        const getStatus = async () => {
            try {
                const res = await axiosJWT.get(`/status/getstatusbyid/${id}`, {
                    headers: { token: `Bearer ${user.accessToken}` },
                })
                setStatus(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getStatus()
    }, [id, user])
    const timeSinceCreation = (Date.now() - Date.parse(status?.createdAt)) / 1000

    const displayTime = config.timeDefault(timeSinceCreation)
    return (
        <div className={cx('wrapper')}>
            <Status timed={displayTime} status={status} className={cx('status')}>
                <h3>{status?.content}</h3>
                {status?.img && <img className={cx('img')} style={{ width: '100%' }} src={status.img} alt="" />}
                {status?.video && <Video url={status.video} />}
            </Status>
        </div>
    )
}

export default OnlyStatus
