import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import noAvt from '../../../public/img/person/non-avt.jpg'
import styles from './Status.module.scss'
import ButtonReact from '../ButtonReact'
import config from '../../../config'
import CreateStatus from '../CreateStatus'
import { Link } from 'react-router-dom'
import useJWT from '../../../config/useJWT'
import Video from '../Video'

interface Props {
    children: any
    timed?: any
    status?: any
    className?: any
}

const cx = classNames.bind(styles)

const Status = (props: Props) => {
    const { children, timed, status, className } = props

    const user = useSelector((state: any) => state.auth.login.currentUser)
    const accessToken = user?.accessToken
    const idUserInfo = user?.userInfo?._id

    const [like, setLike] = useState<any[]>([])
    const [comment, setComment] = useState<any[]>([])
    const [checkShare, setCheckShare] = useState(false)
    const [checkDelete, setCheckDelete] = useState(false)
    const [displayTime, setDisplayTime] = useState('')
    const [idCmt, setIdCmt] = useState('')
    const [volume, setVolume] = useState<any>(0)

    let checkLiked = false
    let idLike: any

    const [content, setContent] = useState('')
    const axiosJWT = useJWT()
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!content) return
        try {
            const newComment = {
                status: status._id,
                user: idUserInfo,
                content,
            }
            const Notifi = {
                idUser: status.user._id,
                idOther: idUserInfo,
                idStatus: status._id,
            }
            setContent('')
            const res = await axiosJWT.post('/status/comment', newComment, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setComment((pre) => [...pre, res.data])
            await axiosJWT.post('/notification/comment', Notifi, {
                headers: { token: `Bearer ${accessToken}` },
            })
        } catch (err) {
            console.log(err)
        }
    }

    like.forEach((like: any) => {
        if (idUserInfo === like?.user._id || idUserInfo === like?.user) {
            checkLiked = true
            idLike = like._id
        }
    })

    const deleteComment = async (id: any) => {
        const Notifi = {
            idOther: idUserInfo,
            idStatus: status._id,
        }
        try {
            await axiosJWT.delete('/status/comment/' + id, {
                headers: { token: `Bearer ${accessToken}` },
            })
            const newComment = comment.filter((c) => {
                return c._id !== id
            })
            setComment(newComment)
            await axiosJWT.put('/notification/uncomment', Notifi, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setCheckDelete(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleLikeComment = async (id: any) => {
        try {
            const likeComment = {
                id: id,
                user: idUserInfo,
                status: status._id,
            }
            const res = await axiosJWT.put('/status/likecomment', likeComment, {
                headers: { token: `Bearer ${accessToken}` },
            })
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
                user: idUserInfo,
                status: status._id,
            }
            const res = await axiosJWT.put('/status/unlikecomment', likeComment, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setComment(res.data)

            //setComment(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleLike = async () => {
        const newLike = {
            status: status._id,
            user: idUserInfo,
        }
        const Notifi = {
            idUser: status.user._id,
            idOther: idUserInfo,
            idStatus: status._id,
        }
        try {
            const res = await axiosJWT.post('/status/like', newLike, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setLike((pre) => [...pre, res.data])
            await axiosJWT.post('/notification/like', Notifi, {
                headers: { token: `Bearer ${accessToken}` },
            })
        } catch (err) {
            console.log(err)
        }
    }
    const handleUnlike = async () => {
        const Notifi = {
            idOther: idUserInfo,
            idStatus: status._id,
        }
        try {
            await axiosJWT.delete('/status/unlike/' + idLike, {
                headers: { token: `Bearer ${accessToken}` },
            })
            const newLike = like.filter((l) => idLike !== l._id)
            setLike(newLike)
            await axiosJWT.put('/notification/unlike', Notifi, {
                headers: { token: `Bearer ${accessToken}` },
            })
        } catch (err) {
            console.log(err)
        }
    }

    let iconStatus: any
    if (status?.shareW === 1) {
        iconStatus = <Icon icon="mdi:world-wide-web" />
    }
    if (status?.shareW === 2) {
        iconStatus = <Icon icon="fa-solid:user-friends" />
    }
    if (status?.shareW === 3) {
        iconStatus = <Icon icon="material-symbols:lock" />
    }
    if (status?.shareW === 4) {
        iconStatus = <Icon icon="uiw:setting" />
    }

    useEffect(() => {
        const getLike = async () => {
            try {
                const res = await axiosJWT.get(`/status/getlike/${status?._id}`, {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setLike(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        const getComment = async () => {
            try {
                const res = await axiosJWT.get(`/status/getcomment/${status?._id}`, {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setComment(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (accessToken) {
            getLike()
            getComment()
        }
    }, [accessToken, status])
    useEffect(() => {
        const timeSinceCreation = (Date.now() - Date.parse(status?.idStatus?.createdAt)) / 1000
        setDisplayTime(config.timeDefault(timeSinceCreation))
    }, [status])

    return (
        <>
            <div className={cx('wrapper', className)}>
                <div className={cx('header')}>
                    <div className={cx('user')}>
                        <Link to={`/profile/${status?.user._id}`}>
                            <div className={cx('img')}>
                                <img src={status?.user?.avtImg?.url || noAvt} alt="" />
                            </div>
                        </Link>
                        <div className={cx('des')}>
                            <Link to={`/profile/${status?.user._id}`}>
                                <div className={cx('name')}>{status?.user.fullName}</div>
                            </Link>
                            <div className={cx('info')}>
                                <div className={cx('time')}>{timed}</div>
                                <div className={cx('status')}>{iconStatus}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('option')}>
                        <Icon icon="iwwa:option-horizontal" style={{ cursor: 'pointer' }} />
                        {idUserInfo !== status?.user._id && (
                            <Icon icon="material-symbols:close" style={{ cursor: 'pointer' }} />
                        )}
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                    {status?.idStatus && (
                        <div className={cx('share')}>
                            <div className={cx('header')}>
                                <div className={cx('user')}>
                                    <Link to={`/profile/${status.idStatus.user?._id || status.idStatus.user}`}>
                                        <div className={cx('img')}>
                                            <img
                                                src={
                                                    status.idStatus.user?.avtImg?.url ||
                                                    status.idStatusUser?.avtImg?.url ||
                                                    noAvt
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                    <div className={cx('des')}>
                                        <Link to={`/profile/${status.idStatus.user?._id || status.idStatus.user}`}>
                                            <div className={cx('name')}>
                                                {status.idStatus.user.fullName || status.idStatusUser.fullName}
                                            </div>
                                        </Link>
                                        <div className={cx('info')}>
                                            <div className={cx('time')}>{displayTime}</div>
                                            <div className={cx('status')}>{iconStatus}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('content')}>
                                {status.idStatus?.content && <h4>{status.idStatus?.content}</h4>}
                                {status.idStatus?.img && (
                                    <img
                                        style={{ width: '100%', borderRadius: '8px' }}
                                        className={cx('img')}
                                        src={status.idStatus.img}
                                        alt=""
                                    />
                                )}
                                {status.idStatus?.video && (
                                    <Video
                                        url={status.idStatus.video}
                                        idVideo={status._id}
                                        volume={volume}
                                        setVolume={setVolume}
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
                            <h4>{status?.share?.length} chia sẻ</h4>
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
                                    <img src={user?.userInfo?.avtImg?.url || noAvt} alt="" />
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
                            const checkCmt = cmt.numberLike.user.includes(idUserInfo)

                            return (
                                <div key={i}>
                                    <div className={cx('user-comment')}>
                                        <Link to={`/profile/${cmt.user._id}`}>
                                            <div className={cx('img')}>
                                                <img src={cmt.user?.avtImg?.url || noAvt} alt="" />
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

                                        {cmt?.user?._id === idUserInfo && (
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
                <CreateStatus setNewsFeed={setCheckShare} share={true} idStatus={status._id} idUser={status.user._id} />
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
