import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './Sender.module.scss'

const cx = classNames.bind(styles)

interface Props {
    me?: any
    chat?: any
}

const Sender = (props: Props) => {
    const { me, chat } = props
    const [userChat, setUserChat] = useState<any>()

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get('/auth?userId=' + chat.sender)
                setUserChat(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [chat.sender])
    return (
        <>
            {me ? (
                <div className={cx('me')}>
                    <div className={cx('text')}>
                        <p>{chat.text}</p>
                    </div>
                </div>
            ) : (
                <div className={cx('item-mess')}>
                    <div className={cx('avt')}>
                        <img
                            src={
                                userChat?.avatarUrl ? userChat?.avatarUrl : 'https://www.danhgiaxe.com/data/avatar.jpg'
                            }
                            alt=""
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('name')}>{userChat?.fullName}</div>
                        <div className={cx('text')}>
                            <p>{chat.text}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Sender
