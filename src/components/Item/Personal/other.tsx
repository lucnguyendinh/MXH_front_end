import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../../config'
import Status from '../Status'
import noAvt from '../../../public/img/person/non-avt.jpg'
import noCoverImg from '../../../public/img/cover/cover-img.png'

import styles from './Other.module.scss'
import { useSelector } from 'react-redux'
import Follow from '../Follow'

const cx = classNames.bind(styles)

const Other = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)

    const [listStatus, setListStatus] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [other, setOther] = useState<any>('')
    const [favorites, setFavorites] = useState<any>(null)
    const [followers, setFollowers] = useState<boolean>(false)
    const [following, setFollowing] = useState<boolean>(false)

    const { id } = useParams()
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/auth?userId=${id}`)
                setUserInfo(res.data)
                setOther(res.data.otherOf)
                setFavorites(res.data.favorites.split(','))
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
    const handleFollow = async () => {
        try {
            const newFollow = {
                id,
                user: user.userInfo._id,
            }
            const res = await axios.put('/profile/follow', newFollow)
            setUserInfo(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleUnFollow = async () => {
        try {
            const newFollow = {
                id,
                user: user.userInfo._id,
            }
            const res = await axios.put('/profile/unfollow', newFollow)
            setUserInfo(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
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
                                <p className={cx('follow-number')} onClick={() => setFollowers(true)}>
                                    {userInfo?.follow.followers.length} người theo dõi
                                </p>
                                <p className={cx('follow-number')} onClick={() => setFollowing(true)}>
                                    Đang theo dõi {userInfo?.follow.following.length} người dùng
                                </p>
                            </div>
                        </div>
                        <div className={cx('option')}>
                            {userInfo?.follow.followers.some((f: any) => {
                                return f._id === user.userInfo._id
                            }) ? (
                                <div onClick={handleUnFollow} className={cx('following')}>
                                    Following
                                </div>
                            ) : (
                                <div onClick={handleFollow} className={cx('follow')}>
                                    Follow
                                </div>
                            )}
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
                        <p>{other}</p>
                        <div className={cx('favorites')}>
                            {favorites?.map((f: any, i: any) => {
                                return (
                                    <div className={cx('f-item')} key={i}>
                                        {f}
                                    </div>
                                )
                            })}
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
                                        avt={status.user.avtImg.url}
                                        status={status.shareW}
                                        share={status.share}
                                        idStatus={status._id}
                                        idStatusS={status.idStatus}
                                    >
                                        <h3>{status.content}</h3>
                                        {status.img && <img className={cx('img')} src={status.img} alt="Thien nhien" />}
                                        {status.video && <video className={cx('img')} src={status.video} controls />}
                                    </Status>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {followers && (
                <div className={cx('follow-tab')}>
                    <Follow
                        title={'Người theo dõi'}
                        setFollowers={setFollowers}
                        followers={userInfo.follow.followers}
                    />
                </div>
            )}
            {following && (
                <div className={cx('follow-tab')}>
                    <Follow title={'Đang theo dõi'} setFollowing={setFollowing} followers={userInfo.follow.following} />
                </div>
            )}
        </>
    )
}

export default Other
