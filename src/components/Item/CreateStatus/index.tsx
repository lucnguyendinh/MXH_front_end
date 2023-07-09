import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import noAvt from '../../../public/img/person/non-avt.jpg'
import styles from './CreateStatus.module.scss'
import config from '../../../config'
import useJWT from '../../../config/useJWT'
import Video from '../Video'

const cx = classNames.bind(styles)

interface Props {
    setNewsFeed?: any
    share?: any
    idStatus?: any
    idUser?: any
}

const CreateStatus = (props: Props) => {
    const { setNewsFeed, share, idStatus, idUser } = props
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const idUserInfo = user?.userInfo._id
    const accessToken = user?.accessToken
    const [optionCheck, setOptionCheck] = useState(1)
    const [checkOption, setCheckOption] = useState(false)
    const [content, setContent] = useState('')
    const [media, setMedia] = useState<any>(null)
    const [status, setStatus] = useState<any>(null)
    const [shareW, setShareW] = useState('Công khai')
    const [displayTime, setDisplayTime] = useState('')
    const inputFileImg = useRef<any>(null)
    const axiosJWT = useJWT()

    const handleImage = (e: any) => {
        const file = e.target.files[0]
        config.setFileToBase(file, setMedia)
    }

    const handleShare = async () => {
        const status = {
            content,
            user: idUserInfo,
            shareW: optionCheck,
            idStatus,
        }
        const Notifi = {
            idUser,
            idOther: idUserInfo,
            idStatus: idStatus,
        }
        try {
            await axiosJWT.post('/status/share', status, {
                headers: { token: `Bearer ${accessToken}` },
            })
            await axiosJWT.post('/notification/share', Notifi, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setNewsFeed(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUp = async () => {
        try {
            const status = {
                content,
                user: idUserInfo,
                shareW: optionCheck,
                media,
            }
            await axiosJWT.post('/status/upstatus', status, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setNewsFeed(false)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const getStatus = async () => {
            try {
                const res = await axiosJWT.get('/status/getstatusbyid/' + idStatus, {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setStatus(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (idStatus) {
            getStatus()
        }
    }, [])
    useEffect(() => {
        const timeSinceCreation = (Date.now() - Date.parse(status?.createdAt)) / 1000
        setDisplayTime(config.timeDefault(timeSinceCreation))
    }, [status?.createdAt])

    const option = [
        {
            title: 'Công khai',
            des: 'Bất kì ai ở trên hoặc ngoài',
            icon: <Icon icon="mdi:world-wide-web" />,
            id: 1,
        },
        {
            title: 'Bạn bè',
            des: 'Bạn bè của bạn',
            icon: <Icon icon="fa-solid:user-friends" />,
            id: 2,
        },
        {
            title: 'Chỉ mình tôi',
            icon: <Icon icon="material-symbols:lock" />,
            id: 3,
        },
        {
            title: 'Tuỳ chỉnh',
            des: 'Bao gồm và loại trừ bạn bè, danh sách',
            icon: <Icon icon="uiw:setting" />,
            id: 4,
        },
    ]

    return (
        <div className={cx('wrapper')}>
            {!checkOption ? (
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        {share ? <h1>Viết bài</h1> : <h1>Tạo bài viết</h1>}

                        <div className={cx('close')}>
                            <div className={cx('icon')} onClick={() => setNewsFeed(false)}>
                                <Icon icon="mdi:close" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <img src={user?.userInfo.avtImg?.url || noAvt} alt="" />
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('name')}>{user?.userInfo.fullName}</div>
                                <div className={cx('option')} onClick={() => setCheckOption(true)}>
                                    {shareW}
                                </div>
                            </div>
                        </div>
                        <div className={cx('input')}>
                            <div className={cx('work')}>
                                <textarea
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                    placeholder="Bạn đang nghĩ gì thế ?"
                                />
                            </div>
                        </div>
                        {!!media && media.startsWith('data:image/') && (
                            <div className={cx('images')}>
                                <img src={media} alt="" />
                            </div>
                        )}
                        {!!media && media.startsWith('data:video/') && (
                            <div className={cx('images')}>
                                <video src={media} controls />
                            </div>
                        )}
                        {share && (
                            <div className={cx('share')}>
                                <div className={cx('header')}>
                                    <div className={cx('user')}>
                                        <div className={cx('img')}>
                                            <img src={status?.user.avtImg?.url || noAvt} alt="" />
                                        </div>
                                        <div className={cx('des')}>
                                            <div className={cx('name')}>{status?.user.fullName}</div>
                                            <div className={cx('info')}>
                                                <div className={cx('time')}>{displayTime}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('content')}>
                                    <h4>{status?.content}</h4>
                                    {status?.img && (
                                        <img style={{ width: '100%' }} className={cx('img')} src={status.img} alt="" />
                                    )}
                                    {status?.video && (
                                        <div className={cx('images')}>
                                            <Video url={status.video} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('more')}>
                            <h4>Thêm vào bài viết của bạn</h4>
                            <div className={cx('icon-more')}>
                                <Icon
                                    onClick={() => inputFileImg.current.click()}
                                    className={cx('icon', 'green')}
                                    icon="icomoon-free:images"
                                />
                                <input
                                    type="file"
                                    id="file"
                                    ref={inputFileImg}
                                    style={{ display: 'none' }}
                                    onChange={handleImage}
                                    accept="image/*,video/*"
                                />
                                <Icon className={cx('icon', 'blue')} icon="fluent-mdl2:add-friend" />
                                <Icon
                                    className={cx('icon', 'orange')}
                                    icon="material-symbols:add-reaction-outline-sharp"
                                />
                                <Icon className={cx('icon', 'red')} icon="akar-icons:check-in" />
                                <Icon className={cx('icon', 'light-blue')} icon="ph:flag-fill" />
                                <Icon className={cx('icon')} icon="iwwa:option-horizontal" />
                            </div>
                        </div>
                        {share ? (
                            <div onClick={handleShare} className={cx('btn-share')}>
                                Chia sẻ
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    if (content || media) handleUp()
                                }}
                                className={cx('up', {
                                    done: content || media,
                                })}
                            >
                                Đăng
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={cx('option-container')}>
                    <div className={cx('header')}>
                        <div className={cx('close')}>
                            <div className={cx('icon')} onClick={() => setCheckOption(false)}>
                                <Icon icon="material-symbols:arrow-back-rounded" />
                            </div>
                        </div>
                        <h1>Đối tượng của bài viết</h1>
                    </div>
                    <div className={cx('option-content')}>
                        <h3>Ai có thể xem bài viết của bạn?</h3>
                        <p>Bài viết của bạn sẽ hiển thị ở Bảng feed, trang cá nhân và kết quả tìm kiếm.</p>
                        <div className={cx('option-options')}>
                            {option.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={cx('option-option-item')}
                                        onClick={() => {
                                            setOptionCheck(item.id)
                                            setShareW(item.title)
                                        }}
                                    >
                                        <div className={cx('option-icon')}>{item.icon}</div>
                                        <div className={cx('option-des')}>
                                            <div className={cx('option-option-title')}>{item.title}</div>
                                            <div className={cx('option-option-des')}>{item.des}</div>
                                        </div>
                                        <input
                                            type="radio"
                                            checked={optionCheck === item.id}
                                            onChange={() => {
                                                setOptionCheck(item.id)
                                                setShareW(item.title)
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={cx('option-footer')}>
                        <div className={cx('option-done')} onClick={() => setCheckOption(false)}>
                            Xong
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateStatus
