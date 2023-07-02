import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './InfoMsg.module.scss'
import noAvt from '../../../public/img/person/non-avt.jpg'
import axios from 'axios'

const cx = classNames.bind(styles)

interface Props {
    className?: any
    id?: any
}

const InfoMsg = (props: Props) => {
    const { className, id } = props

    const [userChat, setUserChat] = useState<any>(null)

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

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('img')}>
                <img src={userChat?.avtImg?.url ? userChat.avtImg.url : noAvt} alt="avt" />
            </div>
            <div className={cx('name')}>
                <h3>{userChat?.fullName}</h3>
            </div>
        </div>
    )
}

export default InfoMsg
