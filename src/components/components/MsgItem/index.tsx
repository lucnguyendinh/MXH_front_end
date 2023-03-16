import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './MsgItem.module.scss'

const cx = classNames.bind(styles)

interface Props {
    item?: any
    onClick?: any
    currentChat?: any
}

const MsgItem = (props: Props) => {
    const { item, onClick, currentChat } = props
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const [infoUser, setInfoUser] = useState<any>()

    useEffect(() => {
        const friendId = item.find((m: any) => m !== user?.userInfo._id)
        const getUser = async () => {
            try {
                const res = await axios.get('/auth?userId=' + friendId)
                setInfoUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [item, user?.userInfo._id])

    return (
        <div
            className={cx('msg-item', {
                active: currentChat,
            })}
            onClick={onClick}
        >
            <div className={cx('avt')}>
                <img
                    src={infoUser?.avatarUrl ? infoUser?.avatarUrl : 'https://www.danhgiaxe.com/data/avatar.jpg'}
                    alt=""
                />
            </div>
            <div className={cx('name')}>{infoUser?.fullName}</div>
        </div>
    )
}

export default MsgItem
