import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../../config'
import Status from '../Status'
import noAvt from '../../../public/img/person/non-avt.jpg'
import noCoverImg from '../../../public/img/cover/cover-img.png'

import styles from './Me.module.scss'
import { useSelector } from 'react-redux'
import EditProfile from '../EditProfile'

const cx = classNames.bind(styles)

const Me = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const [listStatus, setListStatus] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [linkCover, setLinkCover] = useState<any>(null)
    const [confirm, setConfirm] = useState<Boolean>(false)
    const [linkAvt, setLinkAvt] = useState<any>(null)
    const [other, setOther] = useState<any>('')
    const [favorites, setFavorites] = useState<any>(null)
    const [editOtherCheck, setEditOtherCheck] = useState<Boolean>(false)
    const [editProfileCheck, setEditProfileCheck] = useState<Boolean>(false)
    const inputFile = useRef<any>(null)
    const inputFileAvt = useRef<any>(null)

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
    }, [id, editProfileCheck, editOtherCheck])
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

    //handle and convert it in base 64
    const handleImageCover = async (e: any) => {
        const file = e.target.files[0]
        config.setFileToBase(file, setLinkCover)
        setConfirm(true)
    }
    const handleClickCover = async () => {
        try {
            const newI = {
                idUser: user.userInfo._id,
                coverImg: linkCover,
            }
            await axios.put('/profile/upcoverimg', newI)
            setConfirm(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleImageAvt = async (e: any) => {
        const file = e.target.files[0]
        config.setFileToBase(file, setLinkAvt)
    }
    useEffect(() => {
        const confirmAvt = async () => {
            try {
                const newI = {
                    idUser: user.userInfo._id,
                    avtImg: linkAvt,
                }
                await axios.put('/profile/upavtimg', newI)
            } catch (err) {
                console.log(err)
            }
        }
        !!linkAvt && confirmAvt()
    }, [linkAvt, user.userInfo._id])

    const handleSaveOther = async () => {
        try {
            const newO = {
                idUser: user.userInfo._id,
                otherOf: other,
            }
            await axios.put('/profile/editother', newO)

            setEditOtherCheck(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
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
                                    {status.img && (
                                        <img
                                            style={{ width: '100%' }}
                                            className={cx('img')}
                                            src={status.img}
                                            alt="Thien nhien"
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
    )
}

export default Me
