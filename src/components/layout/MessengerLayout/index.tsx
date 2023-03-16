import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import Header from '../../components/Header'
import SidebarMsg from '../../components/SidebarMsg'
import InfoMsg from '../../components/InfoMsg'
import Messenger from '../../page/Messenger'
import styles from './MessengerLayout.module.scss'

const cx = classNames.bind(styles)

const MessengerLayout = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const [userM, setUserM] = useState(null)
    const [idMess, setIdMess] = useState<any>()
    const [idU, setIdU] = useState<any>()

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get(`/message/getmessage/${user.userInfo._id}`)
                setUserM(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessage()
    }, [user?.userInfo._id])
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SidebarMsg className={cx('side-bar')} item={userM} setIdMess={setIdMess} setIdU={setIdU} />
                <Messenger className={cx('msg')} item={idMess} idU={idU} />
                <InfoMsg className={cx('info')} idU={idU} />
            </div>
        </div>
    )
}

export default MessengerLayout
