import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Home.module.scss'
import Status from '../../Item/Status'
import { getStatus } from '../../../redux/Api/apiRequest'
import config from '../../../config'
import NewsFeed from '../../Item/NewsFeed'
import CreateStatus from '../../Item/CreateStatus'

const cx = classNames.bind(styles)

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const listStatus = useSelector((state: any) => state.status.getStatus.curenttStatus)
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
        getStatus(dispatch)
        //dùng tạm
        // setInterval(() => {
        //     getStatus(dispatch)
        // }, 1000)
    }, [dispatch, navigate, user, userRegister])

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
                            avt={status.user.avatarUrl}
                            status={status.shareW}
                            idStatus={status._id}
                        >
                            <h3>{status.content}</h3>
                            {status.img && <img className={cx('img')} src={status.img} alt="Thien nhien" />}
                        </Status>
                    </div>
                )
            })}
        </div>
    )
}

export default Home
