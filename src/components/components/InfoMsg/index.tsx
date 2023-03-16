import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './InfoMsg.module.scss'

const cx = classNames.bind(styles)

interface Props {
    className?: any
    idU?: any
}

const InfoMsg = (props: Props) => {
    const { className, idU } = props
    const [userChat, setUserChat] = useState<any>(null)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get('/auth?userId=' + idU)
                setUserChat(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (idU) getUser()
    }, [idU])

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('img')}>
                <img
                    src={userChat?.avatarUrl ? userChat?.avatarUrl : 'https://www.danhgiaxe.com/data/avatar.jpg'}
                    alt=""
                />
            </div>
            <div className={cx('name')}>
                <h3>{userChat?.fullName}</h3>
            </div>
        </div>
    )
}

export default InfoMsg
