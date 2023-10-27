import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from '../../../config'
import Status from '../Status'
import noAvt from '../../../public/img/person/non-avt.jpg'
import noCoverImg from '../../../public/img/cover/cover-img.png'

import styles from './Other.module.scss'
import { useSelector } from 'react-redux'
import Follow from '../Follow'
import PersonalSkeleton from '../../skeleton/Personal'
import useJWT from '../../../config/useJWT'
import Video from '../Video'

const cx = classNames.bind(styles)

const Other = () => {
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const idUserInfo = user?.userInfo?._id
    const accessToken = user?.accessToken

    const [listStatus, setListStatus] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [other, setOther] = useState<any>('')
    const [favorites, setFavorites] = useState<any>(null)
    const [followers, setFollowers] = useState<boolean>(false)
    const [following, setFollowing] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [volume, setVolume] = useState<any>(0)

    const axiosJWT = useJWT()
    const { id } = useParams()
    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/auth?userId=${id}`)
                setUserInfo(res.data)
                setOther(res.data.otherOf)
                setFavorites(res.data.favorites.split(','))
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [id])
    useEffect(() => {
        const getStatus = async () => {
            try {
                const res = await axiosJWT.get(`/status/getstatus/${id}`, {
                    headers: { token: `Bearer ${accessToken}` },
                })
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
                user: idUserInfo,
            }
            const res = await axiosJWT.put('/profile/follow', newFollow, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setUserInfo(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleUnFollow = async () => {
        try {
            const newFollow = {
                id,
                user: idUserInfo,
            }
            const res = await axiosJWT.put('/profile/unfollow', newFollow, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setUserInfo(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateMsg = async () => {
        try {
            const newMsg = {
                senderId: idUserInfo,
                receiverId: id,
            }
            await axiosJWT.post('/message/createconversation', newMsg, {
                headers: { token: `Bearer ${accessToken}` },
            })
            navigate('/messenger/' + id)
        } catch (err) {
            console.log(err)
        }
    }

    const report = async (option: number) => {
        try {
            const newReport = {
                option,
                idRp: id,
                idU: idUserInfo,
            }
            await axiosJWT.post('/admin/report', newReport, {
                headers: { token: `Bearer ${accessToken}` },
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {loading ? (
                <PersonalSkeleton />
            ) : (
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
                                    return f._id === idUserInfo
                                }) ? (
                                    <div onClick={handleUnFollow} className={cx('following', 'option-b')}>
                                        Following
                                    </div>
                                ) : (
                                    <div onClick={handleFollow} className={cx('follow', 'option-b')}>
                                        Follow
                                    </div>
                                )}
                                <div onClick={handleCreateMsg} className={cx('message', 'option-b')}>
                                    Nhắn tin
                                </div>
                                <div onClick={() => report(1)} className={cx('report', 'option-b')}>
                                    Report
                                </div>
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
                                        <Status timed={displayTime} status={status}>
                                            <h3 style={{ whiteSpace: 'pre-wrap' }}>{status.content}</h3>
                                            {status.img && (
                                                <img className={cx('img')} src={status.img} alt="Thien nhien" />
                                            )}
                                            {status.video && (
                                                <Video
                                                    url={status.video}
                                                    idVideo={status._id}
                                                    volume={volume}
                                                    setVolume={setVolume}
                                                />
                                            )}
                                        </Status>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
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
