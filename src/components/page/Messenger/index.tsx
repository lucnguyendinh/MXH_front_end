import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Socket, io } from 'socket.io-client'

import styles from './Messenger.module.scss'
import Sender from '../../components/Sender'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import noAvt from '../../../public/img/person/non-avt.jpg'
import { Link, useNavigate } from 'react-router-dom'
import useJWT from '../../../config/useJWT'

const cx = classNames.bind(styles)

interface Props {
    className?: any
    idMess?: any
    id?: any
}

const Messenger = (props: Props) => {
    const { className, idMess, id } = props
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const idUserInfo = user?.userInfo?._id
    const accessToken = user?.accessToken
    const userRegister = user?.user

    const [currentChat, setCurrentChat] = useState<any>([])
    const [userChat, setUserChat] = useState<any>()
    const [text, setText] = useState('')
    const [isEmoji, setEmoji] = useState<any>(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    let axiosJWT = useJWT()
    const socket = useRef<Socket | null>(null)

    useEffect(() => {
        socket.current = io('http://localhost:8900/')
        return () => {
            if (socket.current) {
                socket.current.disconnect()
            }
        }
    }, [])
    useEffect(() => {
        if (socket.current) {
            socket.current.emit('addUser', idUserInfo)
            socket.current.on('getUsers', (users: any) => {})
        }
    }, [user])
    useEffect(() => {
        if (socket.current) {
            socket.current.on('getMessage', (data: any) => {
                setCurrentChat((prev: any) => [...prev, data.text])
            })
        }
    }, [])

    useEffect(() => {
        if (!idUserInfo) {
            navigate('/login')
        }
        if (userRegister) {
            navigate('/registerN')
        }
    }, [idUserInfo, userRegister])
    useEffect(() => {
        const getMess = async () => {
            try {
                const res = await axiosJWT.get('/message/getmess/' + idMess, {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setCurrentChat(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (idMess && accessToken) getMess()
    }, [idMess, accessToken])

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get('/auth?userId=' + id)
                setUserChat(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (id) getUser()
    }, [id])
    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [currentChat])

    const handleSubmit = async () => {
        if (!text) return
        try {
            const newChat = {
                conversationId: idMess,
                sender: idUserInfo,
                text: text,
            }
            setText('')
            if (socket.current) {
                socket.current.emit('sendMessage', {
                    senderId: idUserInfo,
                    receiverId: id,
                    text: newChat,
                })
            }

            const res = await axiosJWT.post('/message/mess', newChat, {
                headers: { token: `Bearer ${accessToken}` },
            })
            setCurrentChat((pre: any) => [...pre, res.data])
        } catch (err) {
            console.log(err)
        }
    }

    if (!idUserInfo || userRegister) {
        return <div></div>
    }

    return (
        <div
            onClick={() => {
                if (isEmoji) setEmoji(!isEmoji)
            }}
            className={cx('wrapper', className)}
        >
            <div className={cx('header')}>
                <Link to={`/profile/${userChat?._id}`}>
                    <div className={cx('img')}>
                        <img src={userChat?.avtImg?.url ? userChat?.avtImg.url : noAvt} alt="avt" />
                    </div>
                </Link>
                <Link to={`/profile/${userChat?._id}`}>
                    <div className="name">
                        <h3>{userChat?.fullName}</h3>
                    </div>
                </Link>
            </div>
            {currentChat ? (
                <>
                    <div className={cx('container')}>
                        {currentChat?.map((i: any, index: any) => {
                            return (
                                <div ref={scrollRef} key={index}>
                                    <Sender userChat={i?.sender === id && userChat} chat={i?.text} />
                                </div>
                            )
                        })}
                    </div>
                    <div className={cx('footer')}>
                        <Icon icon="teenyicons:plus-circle-solid" width="30" height="30" className={cx('icon-f')} />
                        <Icon icon="mdi:images" width="30" height="30" className={cx('icon-f')} />
                        <Icon icon="fluent:sticker-24-filled" width="30" height="30" className={cx('icon-f')} />
                        <Icon icon="ic:round-gif-box" width="30" height="30" className={cx('icon-f')} />
                        <form className={cx('form')}>
                            <div className={cx('input')}>
                                <textarea
                                    placeholder="Aa"
                                    onChange={(e: any) => setText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSubmit()
                                        }
                                    }}
                                    value={text}
                                ></textarea>
                                <div className={cx('emoji')} onClick={(e) => e.stopPropagation()}>
                                    {isEmoji && (
                                        <div className={cx('table-emoji')}>
                                            <Picker
                                                style={{ width: '100%' }}
                                                data={data}
                                                onEmojiSelect={(e: any) => setText(text + e.native)}
                                            />
                                        </div>
                                    )}
                                    <Icon
                                        onClick={() => setEmoji(!isEmoji)}
                                        icon="bxs:smile"
                                        width="30"
                                        height="30"
                                        style={{ color: '#1685fc', cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                            <Icon
                                style={{ cursor: 'pointer' }}
                                onClick={handleSubmit}
                                icon="material-symbols:send-rounded"
                                width="30"
                                height="30"
                                className={cx('icon-f')}
                            />
                        </form>
                    </div>
                </>
            ) : (
                <span>Open a conversation to start a chat.</span>
            )}
        </div>
    )
}

export default Messenger
