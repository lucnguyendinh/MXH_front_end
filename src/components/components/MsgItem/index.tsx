import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './MsgItem.module.scss'
import noAvt from '../../../public/img/person/non-avt.jpg'
import axios from 'axios'

const cx = classNames.bind(styles)

interface Props {
    item?: any
    onClick?: any
    currentChat?: any
}

const MsgItem = (props: Props) => {
    const { item, onClick, currentChat } = props
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const idUserInfo = user?.userInfo._id
    const [infoUser, setInfoUser] = useState<any>()

    useEffect(() => {
        const friendId = item.find((m: any) => m !== idUserInfo)
        const getUser = async () => {
            try {
                const res = await axios.get('/auth?userId=' + friendId)
                setInfoUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [item, user])

    return (
        <div
            className={cx('msg-item', {
                active: currentChat,
            })}
            onClick={onClick}
        >
            <div className={cx('avt')}>
                <img src={infoUser?.avtImg?.url ? infoUser?.avtImg.url : noAvt} alt="" />
            </div>
            <div className={cx('name')}>{infoUser?.fullName}</div>
        </div>
    )
}

export default MsgItem
