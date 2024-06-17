import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import config from '../../../config'
import Status from '../Status'
import noAvt from '../../../public/img/person/non-avt.jpg'
import noCoverImg from '../../../public/img/cover/cover-img.png'

import styles from './Me.module.scss'
import { useSelector } from 'react-redux'
import EditProfile from '../EditProfile'
import Follow from '../Follow'
import PersonalSkeleton from '../../skeleton/Personal'
import useJWT from '../../../config/useJWT'
import Video from '../Video'

const cx = classNames.bind(styles)

const Me = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const idUserInfo = user?.userInfo?._id
    const accessToken = user?.accessToken

    const [listStatus, setListStatus] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [linkCover, setLinkCover] = useState<any>(null)
    const [confirm, setConfirm] = useState<Boolean>(false)
    const [linkAvt, setLinkAvt] = useState<any>(null)
    const [other, setOther] = useState<any>('')
    const [favorites, setFavorites] = useState<any>(null)
    const [editOtherCheck, setEditOtherCheck] = useState<Boolean>(false)
    const [editProfileCheck, setEditProfileCheck] = useState<Boolean>(false)
    const [followers, setFollowers] = useState<boolean>(false)
    const [following, setFollowing] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [volume, setVolume] = useState<any>(0)
    const [listAlbum, setListAlbum] = useState<any>([])

    const inputFile = useRef<any>(null)
    const inputFileAvt = useRef<any>(null)
    const axiosJWT = useJWT()
    const { id } = useParams()
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
    const getListAlbum = async () => {
        try {
            const res = await axiosJWT.get('/status/getAlbum/' + idUserInfo, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setListAlbum(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getListAlbum()
    }, [])
    useEffect(() => {
        const getUserL = async () => {
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
        getUserL()
    }, [id])
    useEffect(() => {
        const getStatus = async () => {
            try {
                const listUser = user.userInfo.follow.following || []
                const query = listUser.map((id: string) => `listUser[]=${encodeURIComponent(id)}`).join('&')
                const idUser = user.userInfo._id

                const res = await axiosJWT.get(`/status/getstatus/${id}?${query}&idUser=${idUser}`, {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setListStatus(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (accessToken) getStatus()
    }, [id, accessToken])

    //handle and convert it in base 64
    const handleImageCover = (e: any) => {
        const file = e.target.files[0]
        config.setFileToBase(file, setLinkCover)
        setConfirm(true)
    }
    const handleClickCover = async () => {
        try {
            const newI = {
                idUser: idUserInfo,
                coverImg: linkCover,
            }
            await axiosJWT.put('/profile/upcoverimg', newI, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setConfirm(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleImageAvt = (e: any) => {
        const file = e.target.files[0]
        config.setFileToBase(file, setLinkAvt)
    }
    useEffect(() => {
        const confirmAvt = async () => {
            try {
                const newI = {
                    idUser: idUserInfo,
                    avtImg: linkAvt,
                }
                await axiosJWT.put('/profile/upavtimg', newI, {
                    headers: { token: `Bearer ${accessToken}` },
                })
            } catch (err) {
                console.log(err)
            }
        }
        !!linkAvt && confirmAvt()
    }, [linkAvt, accessToken, idUserInfo])

    const handleSaveOther = async () => {
        try {
            const newO = {
                idUser: idUserInfo,
                otherOf: other,
            }
            await axiosJWT.put('/profile/editother', newO, {
                headers: { token: `Bearer ${accessToken}` },
            })

            setEditOtherCheck(false)
        } catch (err) {
            console.log(err)
        }
    }
    const handleDeleteFollow = async (idU: any) => {
        try {
            const newFollow = {
                user: idU,
                id,
            }
            await axiosJWT.put('/profile/unfollow', newFollow, {
                headers: { token: `Bearer ${accessToken}` },
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }

    const handleUnFollow = async (idU: any) => {
        try {
            const newFollow = {
                id: idU,
                user: id,
            }
            await axiosJWT.put('/profile/unfollow', newFollow, {
                headers: { token: `Bearer ${accessToken}` },
            })
            getUser()
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
                            <img src={!!linkCover ? linkCover : userInfo?.coverImg?.url || noCoverImg} alt="anh-bia" />
                        </div>
                        <div className={cx('h-content')}>
                            <div className={cx('info')}>
                                <div className={cx('avt')} onClick={() => inputFileAvt.current.click()}>
                                    <img src={!!linkAvt ? linkAvt : userInfo?.avtImg?.url || noAvt} alt="avt" />
                                    <input
                                        type="file"
                                        id="file"
                                        ref={inputFileAvt}
                                        style={{ display: 'none' }}
                                        onChange={handleImageAvt}
                                    />
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
                                {confirm ? (
                                    <div className={cx('add-cover-img')} onClick={handleClickCover}>
                                        Xác nhận
                                    </div>
                                ) : (
                                    <div className={cx('add-cover-img')} onClick={() => inputFile.current.click()}>
                                        Chỉnh sửa ảnh bìa
                                    </div>
                                )}

                                <input
                                    type="file"
                                    id="file"
                                    ref={inputFile}
                                    style={{ display: 'none' }}
                                    onChange={handleImageCover}
                                />
                                <div className={cx('edit')} onClick={() => setEditProfileCheck(true)}>
                                    Chỉnh sửa
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
                            {editOtherCheck ? (
                                <>
                                    <textarea
                                        className={cx('edit-other')}
                                        maxLength={160}
                                        placeholder="Tối đa 160 ký tự"
                                        value={other}
                                        onChange={(e) => setOther(e.target.value)}
                                    ></textarea>
                                    <div className={cx('option-other')}>
                                        <div className={cx('luu-profile')} onClick={handleSaveOther}>
                                            Lưu
                                        </div>
                                        <div
                                            className={cx('huy-profile')}
                                            onClick={() => {
                                                setEditOtherCheck(false)
                                                setOther(userInfo.otherOf)
                                            }}
                                        >
                                            Huỷ
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className={cx('otherOf')}>{other}</p>
                                    <div className={cx('edit-profile')} onClick={() => setEditOtherCheck(true)}>
                                        Chỉnh sửa tiểu sử
                                    </div>
                                </>
                            )}
                            <div className={cx('favorites')}>
                                {favorites?.map((f: any, i: any) => {
                                    return (
                                        <div className={cx('f-item')} key={i}>
                                            {f}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={cx('album')}>
                                <h2>Album</h2>
                                <div className={cx('list-album')}>
                                    {listAlbum?.map((album: any, i: any) => {
                                        return (
                                            <Link to={`/statusByAlbum/${album._id}`} className={cx('item')} key={i}>
                                                {album.name}
                                            </Link>
                                        )
                                    })}
                                </div>
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
                                                <img
                                                    style={{ width: '100%' }}
                                                    className={cx('img')}
                                                    src={status.img}
                                                    alt="Thien nhien"
                                                />
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
                    {editProfileCheck && (
                        <div className={cx('edit-profile-item')}>
                            <EditProfile setEditProfileCheck={setEditProfileCheck} userInfo={userInfo} />
                        </div>
                    )}
                </div>
            )}
            {followers && (
                <div className={cx('follow-tab')}>
                    <Follow
                        title={'Người theo dõi'}
                        option={{ title: 'Xóa', handle: handleDeleteFollow }}
                        setFollowers={setFollowers}
                        followers={userInfo.follow.followers}
                    />
                </div>
            )}
            {following && (
                <div className={cx('follow-tab')}>
                    <Follow
                        title={'Đang theo dõi'}
                        option={{ title: 'Bỏ theo dõi', handle: handleUnFollow }}
                        setFollowing={setFollowing}
                        followers={userInfo.follow.following}
                    />
                </div>
            )}
        </>
    )
}

export default Me
