import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Home.module.scss'
import Status from '../../Item/Status'
import config from '../../../config'
import NewsFeed from '../../Item/NewsFeed'
import CreateStatus from '../../Item/CreateStatus'
import axios from 'axios'

const cx = classNames.bind(styles)

const Home = () => {
    const navigate = useNavigate()
    const [listStatus, setListStatus] = useState<any>(null)
    const user = useSelector((state: any) => state.auth.login.currentUser)

    const [newsFeed, setNewsFeed] = useState(false)

    const userRegister = user?.user?._id

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        if (userRegister) {
            navigate('/registerN')
        }
    }, [navigate, user, userRegister])

    useEffect(() => {
        const getStatus = async () => {
            const res = await axios.get('/status/getstatus')
            setListStatus(res.data)
            try {
            } catch (err) {
                console.log(err)
            }
        }
        getStatus()
    }, [])

    return (
        <div className="wrapper">
            <NewsFeed setNewsFeed={setNewsFeed} />
            {newsFeed && <CreateStatus setNewsFeed={setNewsFeed} />}
            {listStatus?.map((status: any, i: any) => {
                const timeSinceCreation = (Date.now() - Date.parse(status.createdAt)) / 1000

                const displayTime = config.timeDefault(timeSinceCreation)

                return (
                    <div key={i}>
                        <Status
                            name={status.user.fullName}
                            timed={displayTime}
                            avt={status.user.avtImg?.url}
                            status={status.shareW}
                            idStatus={status._id}
                            idUser={status.user._id}
                            idStatusS={status.idStatus}
                        >
                            <h3>{status.content}</h3>
                            {status.img && <img className={cx('img')} src={status.img} alt="" />}
                        </Status>
                    </div>
                )
            })}
        </div>
    )
}

export default Home
