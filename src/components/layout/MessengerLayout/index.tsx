import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import Header from '../../components/Header'
import SidebarMsg from '../../components/SidebarMsg'
import InfoMsg from '../../components/InfoMsg'
import Messenger from '../../page/Messenger'
import styles from './MessengerLayout.module.scss'
import { useParams } from 'react-router-dom'
import MessengerSkeleton from '../../skeleton/Messenger'
import useJWT from '../../../config/useJWT'

const cx = classNames.bind(styles)

const MessengerLayout = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const idUserInfo = user?.userInfo._id
    const accessToken = user?.accessToken
    const [userM, setUserM] = useState([])
    const [idMess, setIdMess] = useState<any>()
    const [loading, setLoading] = useState(false)
    const axiosJWT = useJWT()
    const { id } = useParams()

    useEffect(() => {
        userM.forEach((e: any) => {
            if (e.members.includes(id)) {
                setIdMess(e._id)
            }
        })
    }, [userM, id])

    useEffect(() => {
        const getMessage = async () => {
            try {
                setLoading(true)
                const res = await axiosJWT.get(`/message/getmessage/${idUserInfo}`, {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setLoading(false)
                setUserM(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (accessToken) getMessage()
    }, [idUserInfo, accessToken])
    return (
        <>
            {loading ? (
                <MessengerSkeleton />
            ) : (
                <div className={cx('wrapper')}>
                    <Header />
                    <div className={cx('container')}>
                        <SidebarMsg className={cx('side-bar')} item={userM} id={id} />
                        <Messenger className={cx('msg')} idMess={idMess} id={id} />
                        <InfoMsg className={cx('info')} id={id} />
                    </div>
                </div>
            )}
        </>
    )
}

export default MessengerLayout
