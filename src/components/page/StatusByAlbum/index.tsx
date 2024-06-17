import classNames from 'classnames/bind'
import Status from '../../Item/Status'
import styles from './StatusByAlbum.module.scss'
import { useEffect, useState } from 'react'
import useJWT from '../../../config/useJWT'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import config from '../../../config'
import Video from '../../Item/Video'

const cx = classNames.bind(styles)
const StatusByAlbum = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const accessToken = user?.accessToken
    const axiosJWT = useJWT()
    const { id } = useParams()

    const [listStatus, setListStatus] = useState<any>([])
    const [volume, setVolume] = useState<any>(0)

    useEffect(() => {
        const getListStatusByAlbum = async () => {
            const listUser = user.userInfo.follow.following || []
            const query = listUser.map((id: string) => `listUser[]=${encodeURIComponent(id)}`).join('&')
            const idUser = user.userInfo._id

            const res = await axiosJWT.get(`/status/getStatusByAlbum/${id}?${query}&idUser=${idUser}`, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setListStatus(res.data)
        }
        getListStatusByAlbum()
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Album</h2>
                {listStatus?.map((status: any) => {
                    const timeSinceCreation = (Date.now() - Date.parse(status?.createdAt)) / 1000
                    const displayTime = config.timeDefault(timeSinceCreation)

                    return (
                        <Status timed={displayTime} status={status} className={cx('status')} key={status._id}>
                            <h3>{status?.content}</h3>
                            {status?.img && (
                                <img className={cx('img')} style={{ width: '100%' }} src={status.img} alt="" />
                            )}
                            {status?.video && <Video url={status.video} volume={volume} setVolume={setVolume} />}
                        </Status>
                    )
                })}
            </div>
        </div>
    )
}

export default StatusByAlbum
