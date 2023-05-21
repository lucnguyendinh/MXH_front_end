import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../../config'
import Status from '../Status'
import noAvt from '../../../public/img/person/non-avt.jpg'
import noCoverImg from '../../../public/img/cover/cover-img.png'

import styles from './Other.module.scss'

const cx = classNames.bind(styles)

const Other = () => {
    const [listStatus, setListStatus] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)
    const { id } = useParams()
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/auth?userId=${id}`)
                setUserInfo(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [id])
    useEffect(() => {
        const getStatus = async () => {
            try {
                const res = await axios.get(`/status/getstatus/${id}`)
                setListStatus(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getStatus()
    }, [id])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('cover-img')}>
                    <img src={userInfo?.coverImg?.url || noCoverImg} alt="anh-bia" />
                </div>
                <div className={cx('h-content')}>
                    <div className={cx('info')}>
                        <div className={cx('avt')}>
                            <img src={userInfo?.avtImg?.url || noAvt} alt="avt" />
                        </div>
                        <div className={cx('more')}>
                            <h1>{userInfo?.fullName}</h1>
                        </div>
                    </div>
                    <div className={cx('option')}>
                        <div className={cx('friend')}>Bạn bè</div>
                        <div className={cx('message')}>Nhắn tin</div>
                    </div>
                </div>
                <div className={cx('h-footer')}>
                    <div className={cx('item')}>
                        <p>Bài viết</p>
                    </div>
                    <div className={cx('item')}>
                        <p>Giới thiệu</p>
                    </div>
                    <div className={cx('item')}>
                        <p>Bạn bè</p>
                    </div>
                    <div className={cx('item')}>
                        <p>Ảnh</p>
                    </div>
                    <div className={cx('item')}>
                        <p>Video</p>
                    </div>
                    <div className={cx('item')}>
                        <p>Check in</p>
                    </div>
                    <div className={cx('item')}>
                        <p>Xem thêm</p>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('introduct')}>
                    <h2 className={cx('h-intro')}>Giới thiệu</h2>
                    <p>Xin chào mình là admin</p>
                    <div className={cx('favorites')}>
                        <div className={cx('f-item')}>nấu ăn</div>
                        <div className={cx('f-item')}>nấu ăn</div>
                        <div className={cx('f-item')}>nấu ăn</div>
                        <div className={cx('f-item')}>nấu ăn</div>
                        <div className={cx('f-item')}>nấu ăn</div>
                        <div className={cx('f-item')}>nấu ăn</div>
                    </div>
                </div>
                <div className={cx('status')}>
                    {listStatus?.map((status: any, i: any) => {
                        const timeSinceCreation = (Date.now() - Date.parse(status.createdAt)) / 1000

                        const displayTime = config.timeDefault(timeSinceCreation)

                        return (
                            <div key={i}>
                                <Status
                                    name={status.user.fullName}
                                    timed={displayTime}
                                    avt={status.user.avatarUrl}
                                    status={status.shareW}
                                    idStatus={status._id}
                                >
                                    <h3>{status.content}</h3>
                                    {status.img && <img className={cx('img')} src={status.img} alt="Thien nhien" />}
                                </Status>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Other
