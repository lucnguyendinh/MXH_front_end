import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'

import noAvt from '../../../public/img/person/non-avt.jpg'
import styles from './Status.module.scss'
import ButtonReact from '../ButtonReact'
import config from '../../../config'
import CreateStatus from '../CreateStatus'
import { Link } from 'react-router-dom'

interface Props {
    children: any
    name?: any
    timed?: any
    avt?: any
    status?: any
    share?: any
    idStatus?: any
    idUser?: any
    idStatusS?: any
    idStatusUser?: any
}

const cx = classNames.bind(styles)

const Status = (props: Props) => {
    const { children, name, timed, avt, status, share, idStatus, idUser, idStatusS, idStatusUser } = props

    const user = useSelector((state: any) => state.auth.login.currentUser)
    const [like, setLike] = useState<any[]>([])
    const [comment, setComment] = useState<any[]>([])
    const [checkShare, setCheckShare] = useState(false)
    const [checkDelete, setCheckDelete] = useState(false)
    const [displayTime, setDisplayTime] = useState('')
    const [idCmt, setIdCmt] = useState('')
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
        const Notifi = {
            idUser: idUser,
            idOther: user.userInfo._id,
            idStatus: idStatus,
        }
        try {
            const res = await axios.post('/status/comment', newComment)
            setComment((pre) => [...pre, res.data])
            await axios.post('/notification/comment', Notifi)
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

    const deleteComment = async (id: any) => {
        const Notifi = {
            idOther: user.userInfo._id,
            idStatus: idStatus,
        }
        try {
            await axios.delete('/status/comment/' + id)
            const newComment = comment.filter((c) => {
                return c._id !== id
            })
            setComment(newComment)
            await axios.put('/notification/uncomment', Notifi)
            setCheckDelete(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleLikeComment = async (id: any) => {
        try {
            const likeComment = {
                id: id,
                user: user?.userInfo._id,
                status: idStatus,
            }
            const res = await axios.put('/status/likecomment', likeComment)
            console.log(res.data)

            setComment(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUnLikeComment = async (id: any) => {
        try {
            const likeComment = {
                id: id,
                user: user?.userInfo._id,
                status: idStatus,
            }
            const res = await axios.put('/status/unlikecomment', likeComment)
            setComment(res.data)

            //setComment(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleLike = async () => {
        const newLike = {
            status: idStatus,
            user: user.userInfo._id,
        }
        const Notifi = {
            idUser: idUser,
            idOther: user.userInfo._id,
            idStatus: idStatus,
        }
        try {
            const res = await axios.post('/status/like', newLike)
            setLike((pre) => [...pre, res.data])
            await axios.post('/notification/like', Notifi)
        } catch (err) {
            console.log(err)
        }
    }
    const handleUnlike = async () => {
        const Notifi = {
            idOther: user.userInfo._id,
            idStatus: idStatus,
        }
        try {
            await axios.delete('/status/unlike/' + idLike, idLike)
            const newLike = like.filter((l) => idLike !== l._id)
            setLike(newLike)
            await axios.put('/notification/unlike', Notifi)
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
        getLike()
        getComment()
    }, [idStatus])
    useEffect(() => {
        const timeSinceCreation = (Date.now() - Date.parse(idStatusS?.createdAt)) / 1000
        setDisplayTime(config.timeDefault(timeSinceCreation))
    }, [idStatusS?.createdAt])

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('user')}>
                        <Link to={`/profile/${idUser}`}>
                            <div className={cx('img')}>
                                <img src={avt || noAvt} alt="" />
                            </div>
                        </Link>
                        <div className={cx('des')}>
                            <Link to={`/profile/${idUser}`}>
                                <div className={cx('name')}>{name}</div>
                            </Link>
                            <div className={cx('info')}>
                                <div className={cx('time')}>{timed}</div>
                                <div className={cx('status')}>{iconStatus}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('option')}>
                        <Icon icon="iwwa:option-horizontal" style={{ cursor: 'pointer' }} />
                        {user?.userInfo._id !== idUser && (
                            <Icon icon="material-symbols:close" style={{ cursor: 'pointer' }} />
                        )}
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                    {idStatusS && (
                        <div className={cx('share')}>
                            <div className={cx('header')}>
                                <div className={cx('user')}>
                                    <div className={cx('img')}>
                                        <img
                                            src={idStatusS.user.avtImg?.url || idStatusUser.avtImg?.url || noAvt}
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('des')}>
                                        <div className={cx('name')}>
                                            {idStatusS.user.fullName || idStatusUser.fullName}
                                        </div>
                                        <div className={cx('info')}>
                                            <div className={cx('time')}>{displayTime}</div>
                                            <div className={cx('status')}>{iconStatus}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('content')}>
                                {idStatusS?.content && <h4>{idStatusS?.content}</h4>}
                                {idStatusS?.img && (
                                    <img style={{ width: '100%' }} className={cx('img')} src={idStatusS.img} alt="" />
                                )}
                                {idStatusS?.video && (
                                    <video
                                        style={{ width: '100%' }}
                                        className={cx('img')}
                                        src={idStatusS.video}
                                        controls
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className={cx('footer')}>
                    <div className={cx('number-react')}>
                        <h4>{like.length} lượt thích</h4>
                        <div className={cx('comment-share')}>
                            <h4>{comment.length} bình luận</h4>
                            <h4>{share?.length} chia sẻ</h4>
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
                        <ButtonReact onClick={() => setCheckShare(true)} className={cx('btn-react')}>
                            Chia se
                        </ButtonReact>
                    </div>
                    <div className={cx('comment')}>
                        <form onSubmit={handleSubmit}>
                            <div className={cx('write')}>
                                <div className={cx('img')}>
                                    <img src={user?.userInfo.avtImg?.url || noAvt} alt="" />
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
                        {comment?.map((cmt: any, i: any) => {
                            const timeSinceCreation = (Date.now() - Date.parse(cmt.createdAt)) / 1000
                            const displayTime = config.timeDefault(timeSinceCreation)
                            const checkCmt = cmt.numberLike.user.includes(user?.userInfo._id)

                            return (
                                <div key={i}>
                                    <div className={cx('user-comment')}>
                                        <Link to={`/profile/${cmt.user._id}`}>
                                            <div className={cx('img')}>
                                                <img src={cmt.user.avtImg?.url || noAvt} alt="" />
                                            </div>
                                        </Link>
                                        <div className={cx('body-comment')}>
                                            <Link to={`/profile/${cmt.user._id}`}>
                                                <div className={cx('name')}>
                                                    <h4>{cmt.user.fullName}</h4>
                                                </div>
                                            </Link>
                                            <div className={cx('content')}>
                                                <p>{cmt.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('option')}>
                                        {checkCmt ? (
                                            <div style={{ color: '#2078f4' }} className={cx('like')}>
                                                <p onClick={() => handleUnLikeComment(cmt._id)}>
                                                    Thich ({cmt.numberLike.count})
                                                </p>
                                            </div>
                                        ) : (
                                            <div className={cx('like')}>
                                                <p onClick={() => handleLikeComment(cmt._id)}>
                                                    Thich {cmt.numberLike.count > 0 && `(${cmt.numberLike.count})`}
                                                </p>
                                            </div>
                                        )}

                                        {cmt?.user?._id === user?.userInfo._id && (
                                            <div className={cx('feedback')}>
                                                <p
                                                    onClick={() => {
                                                        setIdCmt(cmt?._id)
                                                        setCheckDelete(true)
                                                    }}
                                                >
                                                    Xoá
                                                </p>
                                            </div>
                                        )}
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
            {checkShare && (
                <CreateStatus setNewsFeed={setCheckShare} share={true} idStatus={idStatus} idUser={idUser} />
            )}
            {checkDelete && (
                <div className={cx('wapper-delete')}>
                    <div className={cx('tab-delete')}>
                        <div className={cx('header-delete')}>
                            <h2>Xoá bình luận</h2>
                            <div className={cx('close')}>
                                <div
                                    className={cx('icon')}
                                    onClick={() => {
                                        setCheckDelete(false)
                                        setIdCmt('')
                                    }}
                                >
                                    <Icon icon="mdi:close" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('container')}>
                            <p>Bạn có chắc muốn xoá bình luận này không?</p>
                            <div className={cx('option-delete')}>
                                <ButtonReact
                                    onClick={() => {
                                        setCheckDelete(false)
                                        setIdCmt('')
                                    }}
                                    className={cx('not-delete')}
                                >
                                    Không
                                </ButtonReact>
                                <ButtonReact onClick={() => deleteComment(idCmt)} className={cx('delete')}>
                                    Xoá
                                </ButtonReact>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Status
