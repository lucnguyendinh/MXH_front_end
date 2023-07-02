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
import HomeSkeleton from '../../skeleton/Home'
import Error from '../../components/Error'
import useJWT from '../../../config/useJWT'
import Video from '../../Item/Video'

const cx = classNames.bind(styles)

const Home = () => {
    const navigate = useNavigate()
    const [listStatus, setListStatus] = useState<any>([])
    const [newsFeed, setNewsFeed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const axiosJWT = useJWT()
    const getStatusLast = async () => {
        try {
            const res = await axiosJWT.get('/status/getstatus', {
                headers: { token: `Bearer ${user.accessToken}` },
            })

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
                const res = await axiosJWT.get('/status/getstatus', {
                    headers: { token: `Bearer ${user.accessToken}` },
                })
                setListStatus(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getStatus()
    }, [user])

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
                                    <Status timed={displayTime} status={status}>
                                        <h3 style={{ whiteSpace: 'pre-wrap' }}>{status.content}</h3>
                                        {status.img && <img className={cx('img')} src={status.img} alt="" />}
                                        {status.video && <Video url={status.video} />}
                                    </Status>
                                </div>
                            )
                        } else {
                            return (
                                <div key={i}>
                                    <Status timed={displayTime} status={status}>
                                        <h3>{status.content}</h3>
                                        {status.img && <img className={cx('img')} src={status.img} alt="" />}
                                        {status.video && <Video url={status.video} />}
                                    </Status>
                                </div>
                            )
                        }
                    })}
                </div>
            )}
            {error && <Error setError={setError} />}
        </>
    )
}

export default Home
