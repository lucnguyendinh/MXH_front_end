import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import styles from './Status.module.scss'
import ButtonReact from '../ButtonReact'
import config from '../../../config'
import {
    comment as userComment,
    like as userLike,
    unLike,
} from '../../../redux/Api/apiRequest'

interface Props {
    children: any
    name?: any
    timed?: any
    avt?: any
    status?: any
    like?: any
    liked?: any
    comment?: any
    share?: any
    userCmt?: any
    idStatus?: any
}

const cx = classNames.bind(styles)

const Status = (props: Props) => {
    const {
        children,
        name,
        timed,
        avt,
        status,
        like,
        liked,
        comment,
        share,
        userCmt,
        idStatus,
    } = props

    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.auth.login.currentUser)
    let checkLiked = false
    let idLike: any

    const [content, setContent] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const newComment = {
            status: idStatus,
            user: user.userInfo._id,
            content,
        }
        userComment(newComment, dispatch)
        setContent('')
    }

    liked.map((like: any) => {
        if (like?.user._id === user.userInfo._id) {
            checkLiked = true
            idLike = like?._id
        }
    })

    const handleLike = () => {
        const newLike = {
            status: idStatus,
            user: user.userInfo._id,
        }
        userLike(newLike, dispatch)
    }
    const handleUnlike = () => {
        const newUnLike = {
            status: idStatus,
            user: user.userInfo._id,
        }
        console.log(newUnLike)

        unLike(dispatch, idLike)
    }

    let iconStatus: any
    if (status === 1) {
        iconStatus = <Icon icon="mdi:world-wide-web" />
    }
    if (status === 2) {
        iconStatus = <Icon icon="material-symbols:lock" />
    }
    if (status === 3) {
        iconStatus = <Icon icon="fa-solid:user-friends" />
    }
    if (status === 4) {
        iconStatus = <Icon icon="uiw:setting" />
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('user')}>
                    <div className={cx('img')}>{avt}</div>
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
                    <h4>{like} lượt thích</h4>
                    <div className={cx('comment-share')}>
                        <h4>{comment} bình luận</h4>
                        <h4>{share} chia sẻ</h4>
                    </div>
                </div>
                <div className={cx('react')}>
                    {checkLiked ? (
                        <ButtonReact
                            onClick={handleUnlike}
                            className={cx('btn-react', 'liked')}
                        >
                            Đã Thich
                        </ButtonReact>
                    ) : (
                        <ButtonReact
                            onClick={handleLike}
                            className={cx('btn-react')}
                        >
                            Thich
                        </ButtonReact>
                    )}
                    <ButtonReact className={cx('btn-react')}>
                        Binh luan
                    </ButtonReact>
                    <ButtonReact className={cx('btn-react')}>
                        Chia se
                    </ButtonReact>
                </div>
                <div className={cx('comment')}>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('write')}>
                            <div className={cx('img')}>
                                <Icon icon="icon-park:avatar" />
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
                    {userCmt.map((cmt: any, i: any) => {
                        const timeSinceCreation =
                            (Date.now() - Date.parse(cmt.createdAt)) / 1000
                        const displayTime =
                            config.timeDefault(timeSinceCreation)

                        return (
                            <div key={i}>
                                <div className={cx('user-comment')}>
                                    <div className={cx('img')}>
                                        {cmt.avatarUrl}
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
