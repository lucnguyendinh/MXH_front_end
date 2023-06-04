import classNames from 'classnames/bind'

import styles from './Notifications.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import noAvt from '../../../public/img/person/non-avt.jpg'
import config from '../../../config'

const cx = classNames.bind(styles)

const Notifications = () => {
    const [listNotifi, setListNotifi] = useState<any>(null)
    const user = useSelector((state: any) => state.auth.login.currentUser)
    useEffect(() => {
        const getNotifi = async () => {
            const res = await axios.get('/notification/' + user?.userInfo?._id)
            setListNotifi(res.data)
            try {
            } catch (err) {
                console.log(err)
            }
        }
        getNotifi()
    }, [])
    return (
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

                        return (
                            <div className={cx('item')} key={i}>
                                <div className={cx('img')}>
                                    <img src={userLast?.avtImg?.url || noAvt} alt="" />
                                </div>
                                <div>
                                    <p>
                                        <strong>{userLast?.fullName}</strong> và{' '}
                                        <strong>{l.count - 1} người khác</strong> đã <strong>{action}</strong> bài viết
                                        của bạn
                                    </p>
                                    <p>{displayTime}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Notifications
