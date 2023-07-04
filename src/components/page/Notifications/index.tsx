import classNames from 'classnames/bind'

import styles from './Notifications.module.scss'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import noAvt from '../../../public/img/person/non-avt.jpg'
import config from '../../../config'
import { Link } from 'react-router-dom'
import NotificationsSkeleton from '../../skeleton/Notifications'
import useJWT from '../../../config/useJWT'

const cx = classNames.bind(styles)

const Notifications = () => {
    let axiosJWT = useJWT()
    const [listNotifi, setListNotifi] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const idUserInfo = user?.userInfo._id
    const accessToken = user?.accessToken

    useEffect(() => {
        const getNotifi = async () => {
            try {
                setLoading(true)
                const res = await axiosJWT.get('/notification/' + idUserInfo, {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setListNotifi(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        if (accessToken) getNotifi()
    }, [accessToken, idUserInfo])
    return (
        <>
            {loading ? (
                <NotificationsSkeleton />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <h1 className={cx('h')}>Thông báo</h1>
                        <div className={cx('content')}>
                            {listNotifi?.map((l: any, i: any) => {
                                const timeSinceCreation = (Date.now() - Date.parse(l.updatedAt)) / 1000

                                const displayTime = config.timeDefault(timeSinceCreation)

                                let action = ''
                                const userLastIndex = l.idOther.length - 1
                                const userLast = l.idOther[userLastIndex]

                                if (l.action === 1) {
                                    action = 'Thích'
                                } else if (l.action === 2) {
                                    action = 'Bình luận'
                                } else if (l.action === 3) {
                                    action = 'Chia sẻ'
                                }
                                if (l.count !== 0) {
                                    return (
                                        <Link key={i} to={`/status/${l.idStatus}`}>
                                            <div className={cx('item')}>
                                                <div className={cx('img')}>
                                                    <img src={userLast?.avtImg?.url || noAvt} alt="" />
                                                </div>
                                                <div>
                                                    {l.count === 1 ? (
                                                        <>
                                                            <p>
                                                                <strong>{userLast?.fullName}</strong> đã{' '}
                                                                <strong>{action}</strong> bài viết của bạn
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>
                                                                <strong>{userLast?.fullName}</strong> và{' '}
                                                                <strong>{l.count - 1} người khác</strong> đã{' '}
                                                                <strong>{action}</strong> bài viết của bạn
                                                            </p>
                                                        </>
                                                    )}
                                                    <p>{displayTime}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Notifications
