import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { io } from 'socket.io-client'

import styles from './Messenger.module.scss'
import Sender from '../../components/Sender'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import noAvt from '../../../public/img/person/non-avt.jpg'

const cx = classNames.bind(styles)

interface Props {
    className?: any
    idMess?: any
    id?: any
}

const Messenger = (props: Props) => {
    const { className, idMess, id } = props
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const [currentChat, setCurrentChat] = useState<any>(null)
    const [userChat, setUserChat] = useState<any>(null)
    const [text, setText] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState<any>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const socket = useRef<any>()

    useEffect(() => {
        socket.current = io('http://localhost:8900')
        socket.current.on('getMessage', (data: any) => {
            setArrivalMessage(data.text)
        })
    }, [])
    useEffect(() => {
        arrivalMessage && setCurrentChat((pre: any) => [...pre, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        //emit: gửi lên server
        socket.current.emit('addUser', user?.userInfo._id)
        socket.current.on('getUsers', (users: any) => {
            console.log(users)
        })
    }, [user?.userInfo._id])

    useEffect(() => {
        const getMess = async () => {
            try {
                const res = await axios.get('/message/getmess/' + idMess)
                setCurrentChat(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (idMess) getMess()
    }, [idMess])

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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const newChat = {
                conversationId: idMess,
                sender: user?.userInfo._id,
                text: text,
            }

            socket.current.emit('sendMessage', {
                senderId: user.userInfo._id,
                receiverId: id,
                text: newChat,
            })

            const res = await axios.post('/message/mess', newChat)
            setCurrentChat((pre: any) => [...pre, res.data])
            setText('')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <div className={cx('img')}>
                    <img src={userChat?.avtImg?.url ? userChat?.avtImg.url : noAvt} alt="avt" />
                </div>
                <div className="name">
                    <h3>{userChat?.fullName}</h3>
                </div>
            </div>
            {currentChat ? (
                <>
                    <div className={cx('container')}>
                        {currentChat?.map((i: any, index: any) => {
                            return (
                                <div ref={scrollRef} key={index}>
                                    <Sender chat={i} me={i.sender === user?.userInfo._id} />
                                </div>
                            )
                        })}
                    </div>
                    <div className={cx('footer')}>
                        <Icon icon="teenyicons:plus-circle-solid" width="30" height="30" className={cx('icon-f')} />
                        <Icon icon="mdi:images" width="30" height="30" className={cx('icon-f')} />
                        <Icon icon="fluent:sticker-24-filled" width="30" height="30" className={cx('icon-f')} />
                        <Icon icon="ic:round-gif-box" width="30" height="30" className={cx('icon-f')} />
                        <form onSubmit={handleSubmit} className={cx('form')}>
                            <div className={cx('input')}>
                                <input
                                    type="text"
                                    placeholder="Aa"
                                    onChange={(e: any) => setText(e.target.value)}
                                    value={text}
                                />
                                <button>
                                    <Icon icon="bxs:smile" width="30" height="30" style={{ color: '#1685fc' }} />
                                </button>
                            </div>
                        </form>
                        <Icon icon="material-symbols:send-rounded" width="30" height="30" className={cx('icon-f')} />
                    </div>
                </>
            ) : (
                <span>Open a conversation to start a chat.</span>
            )}
        </div>
    )
}

export default Messenger
