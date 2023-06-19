import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

import styles from './Home.module.scss'
import Status from '../../Item/Status'
import config from '../../../config'
import NewsFeed from '../../Item/NewsFeed'
import CreateStatus from '../../Item/CreateStatus'
import axios from 'axios'
import HomeSkeleton from '../../skeleton/Home'

const cx = classNames.bind(styles)

const Home = () => {
    const navigate = useNavigate()
    const [listStatus, setListStatus] = useState<any>([])
    const [newsFeed, setNewsFeed] = useState(false)
    const [loading, setLoading] = useState(false)
    const user = useSelector((state: any) => state.auth.login.currentUser)

    const getStatusLast = async () => {
        try {
            const res = await axios.get('/status/getstatus')

            setListStatus((prev: any) => {
                const status = [...prev, ...res.data]
                const uniqueArray = _.uniqBy(status, '_id')
                return uniqueArray
            })
        } catch (err) {
            console.log(err)
        }
    }

    const observer = useRef<any>()

    const lastStatusElementRef = useCallback((node: any) => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                getStatusLast()
            }
        })
        if (node) observer.current.observe(node)
    }, [])

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
            try {
                setLoading(true)
                const res = await axios.get('/status/getstatus')
                setListStatus(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getStatus()
    }, [])

    return (
        <>
            {loading ? (
                <HomeSkeleton />
            ) : (
                <div className="wrapper">
                    <NewsFeed setNewsFeed={setNewsFeed} />
                    {newsFeed && <CreateStatus setNewsFeed={setNewsFeed} />}
                    {listStatus?.map((status: any, i: any) => {
                        const timeSinceCreation = (Date.now() - Date.parse(status.createdAt)) / 1000

                        const displayTime = config.timeDefault(timeSinceCreation)
                        if (listStatus.length === i + 1) {
                            return (
                                <div ref={lastStatusElementRef} key={i}>
                                    <Status
                                        name={status.user.fullName}
                                        timed={displayTime}
                                        avt={status.user.avtImg?.url}
                                        status={status.shareW}
                                        share={status.share}
                                        idStatus={status._id}
                                        idUser={status.user._id}
                                        idStatusS={status.idStatus}
                                        idStatusUser={status.idStatusUser}
                                    >
                                        <h3 style={{ whiteSpace: 'pre-wrap' }}>{status.content}</h3>
                                        {status.img && <img className={cx('img')} src={status.img} alt="" />}
                                        {status.video && <video className={cx('img')} src={status.video} controls />}
                                    </Status>
                                </div>
                            )
                        } else {
                            return (
                                <div key={i}>
                                    <Status
                                        name={status.user.fullName}
                                        timed={displayTime}
                                        avt={status.user.avtImg?.url}
                                        status={status.shareW}
                                        share={status.share}
                                        idStatus={status._id}
                                        idUser={status.user._id}
                                        idStatusS={status.idStatus}
                                        idStatusUser={status.idStatusUser}
                                    >
                                        <h3>{status.content}</h3>
                                        {status.img && <img className={cx('img')} src={status.img} alt="" />}
                                        {status.video && <video className={cx('img')} src={status.video} controls />}
                                    </Status>
                                </div>
                            )
                        }
                    })}
                </div>
            )}
        </>
    )
}

export default Home
