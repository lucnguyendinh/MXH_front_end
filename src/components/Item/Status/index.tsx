import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import styles from './Status.module.scss'
import ButtonReact from '../ButtonReact'
import config from '../../../config'
import axios from 'axios'

interface Props {
    children: any
    name?: any
    timed?: any
    avt?: any
    status?: any
    idStatus?: any
}

const cx = classNames.bind(styles)

const Status = (props: Props) => {
    const { children, name, timed, avt, status, idStatus } = props

    const user = useSelector((state: any) => state.auth.login.currentUser)
    const [like, setLike] = useState<any[]>([])
    const [comment, setComment] = useState<any[]>([])
    const [share, setShare] = useState<any[]>([])

    let checkLiked = false
    let idLike: any

    const [content, setContent] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const newComment = {
            status: idStatus,
            user: user?.userInfo._id,
            content,
        }
        try {
            const res = await axios.post('/status/comment', newComment)
            setComment((pre) => [...pre, res.data])
        } catch (err) {
            console.log(err)
        }
        setContent('')
    }

    like.forEach((like: any) => {
        if (user?.userInfo._id === like?.user._id || user?.userInfo._id === like?.user) {
            checkLiked = true
            idLike = like._id
        }
    })

    const handleLike = async () => {
        const newLike = {
            status: idStatus,
            user: user.userInfo._id,
        }
        console.log(like)

        try {
            const res = await axios.post('/status/like', newLike)
            setLike((pre) => [...pre, res.data])
            console.log(like)
        } catch (err) {
            console.log(err)
        }
    }
    const handleUnlike = async () => {
        try {
            await axios.delete('/status/unlike/' + idLike, idLike)
            const newLike = like.filter((l) => idLike !== l._id)
            setLike(newLike)
        } catch (err) {
            console.log(err)
        }
    }

    let iconStatus: any
    if (status === 1) {
        iconStatus = <Icon icon="mdi:world-wide-web" />
    }
    if (status === 2) {
        iconStatus = <Icon icon="fa-solid:user-friends" />
    }
    if (status === 3) {
        iconStatus = <Icon icon="material-symbols:lock" />
    }
    if (status === 4) {
        iconStatus = <Icon icon="uiw:setting" />
    }

    useEffect(() => {
        const getLike = async () => {
            const res = await axios.get(`/status/getlike/${idStatus}`)
            setLike(res.data)
        }
        const getComment = async () => {
            const res = await axios.get(`/status/getcomment/${idStatus}`)
            setComment(res.data)
        }
        const getShare = async () => {
            const res = await axios.get(`/status/getshare/${idStatus}`)
            setShare(res.data)
        }
        getLike()
        getComment()
        getShare()
    }, [idStatus])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('user')}>
                    <div className={cx('img')}>
                        <img src={avt} alt="" />
                    </div>
                    <div className={cx('des')}>
                        <div className={cx('name')}>{name}</div>
                        <div className={cx('info')}>
                            <div className={cx('time')}>{timed}</div>
                            <div className={cx('status')}>{iconStatus}</div>
                        </div>
                    </div>
                </div>
                <div className={cx('option')}>
                    <Icon icon="iwwa:option-horizontal" />
                    <Icon icon="material-symbols:close" />
                </div>
            </div>
            <div className={cx('content')}>{children}</div>
            <div className={cx('footer')}>
                <div className={cx('number-react')}>
                    <h4>{like.length} lượt thích</h4>
                    <div className={cx('comment-share')}>
                        <h4>{comment.length} bình luận</h4>
                        <h4>{share.length} chia sẻ</h4>
                    </div>
                </div>
                <div className={cx('react')}>
                    {checkLiked ? (
                        <ButtonReact onClick={handleUnlike} className={cx('btn-react', 'liked')}>
                            Đã Thich
                        </ButtonReact>
                    ) : (
                        <ButtonReact onClick={handleLike} className={cx('btn-react')}>
                            Thich
                        </ButtonReact>
                    )}
                    <ButtonReact className={cx('btn-react')}>Binh luan</ButtonReact>
                    <ButtonReact className={cx('btn-react')}>Chia se</ButtonReact>
                </div>
                <div className={cx('comment')}>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('write')}>
                            <div className={cx('img')}>
                                <img src={user?.userInfo.avatarUrl} alt="" />
                            </div>
                            <div className={cx('input')}>
                                <input
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                    type="text"
                                    placeholder="Viet binh luan cong khai"
                                />
                            </div>
                        </div>
                    </form>
                    {comment.map((cmt: any, i: any) => {
                        const timeSinceCreation = (Date.now() - Date.parse(cmt.createdAt)) / 1000
                        const displayTime = config.timeDefault(timeSinceCreation)

                        return (
                            <div key={i}>
                                <div className={cx('user-comment')}>
                                    <div className={cx('img')}>
                                        <img src={cmt.user.avatarUrl} alt="" />
                                    </div>
                                    <div className={cx('body-comment')}>
                                        <div className={cx('name')}>
                                            <h4>{cmt.user.fullName}</h4>
                                        </div>
                                        <div className={cx('content')}>
                                            <p>{cmt.content}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('option')}>
                                    <div className={cx('like')}>
                                        <p>Thich</p>
                                    </div>
                                    <div className={cx('feedback')}>
                                        <p>Phan hoi</p>
                                    </div>
                                    <div className={cx('time')}>
                                        <p>{displayTime}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Status
