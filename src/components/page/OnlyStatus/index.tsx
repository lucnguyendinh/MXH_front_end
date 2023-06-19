import classNames from 'classnames/bind'

import styles from './OnlyStatus.module.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Status from '../../Item/Status'
import config from '../../../config'

const cx = classNames.bind(styles)

const OnlyStatus = () => {
    const { id } = useParams()
    const [status, setStatus] = useState<any>(null)
    useEffect(() => {
        const getStatus = async () => {
            try {
                const res = await axios.get(`/status/getstatusbyid/${id}`)
                console.log(res.data)

                setStatus(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getStatus()
    }, [id])
    const timeSinceCreation = (Date.now() - Date.parse(status?.createdAt)) / 1000

    const displayTime = config.timeDefault(timeSinceCreation)
    return (
        <div className={cx('wrapper')}>
            <Status
                name={status?.user.fullName}
                timed={displayTime}
                avt={status?.user.avtImg?.url}
                status={status?.shareW}
                share={status?.share}
                idStatus={status?._id}
                idUser={status?.user._id}
                idStatusS={status?.idStatus}
                idStatusUser={status?.idStatusUser}
                className={cx('status')}
            >
                <h3>{status?.content}</h3>
                {status?.img && <img className={cx('img')} style={{ width: '100%' }} src={status.img} alt="" />}
                {status?.video && <video className={cx('img')} style={{ width: '100%' }} src={status.video} controls />}
            </Status>
        </div>
    )
}

export default OnlyStatus
