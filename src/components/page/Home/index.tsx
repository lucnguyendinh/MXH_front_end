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
import StatusSkeleton from '../../skeleton/Status'
import useJWT from '../../../config/useJWT'
import Video from '../../Item/Video'
import Toast from '../../Item/Toast'

const cx = classNames.bind(styles)

const Home = () => {
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const accessToken = user?.accessToken
    const userInfo = user?.userInfo
    const userRegister = user?.user

    const [listStatus, setListStatus] = useState<any>([])
    const [newsFeed, setNewsFeed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [volume, setVolume] = useState<any>(0)

    const axiosJWT = useJWT()

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (userRegister) {
            navigate('/registerN')
        }
    }, [userInfo, userRegister])

    const getStatusLast = async () => {
        try {
            const listUser = user.userInfo.follow.following || []
            const query = listUser.map((id: string) => `listUser[]=${encodeURIComponent(id)}`).join('&')
            const res = await axiosJWT.get(`/status/getstatus?${query}`, {
                headers: { token: `Bearer ${accessToken}` },
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

    const lastStatusElementRef = useCallback(
        (node: any) => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    if (accessToken) getStatusLast()
                }
            })
            if (node) observer.current.observe(node)
        },
        [accessToken],
    )

    useEffect(() => {
        const getStatus = async () => {
            const listUser = user.userInfo.follow.following || []
            const query = listUser.map((id: string) => `listUser[]=${encodeURIComponent(id)}`).join('&')
            try {
                setLoading(true)
                const res = await axiosJWT.get(`/status/getstatus?${query}`, {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setListStatus(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        if (accessToken) getStatus()
    }, [accessToken])

    if (!userInfo || userRegister) {
        return <div></div>
    }

    return (
        <>
            {loading ? (
                <StatusSkeleton />
            ) : (
                <div className="wrapper">
                    <NewsFeed setNewsFeed={setNewsFeed} />
                    {newsFeed && <CreateStatus setError={setError} setNewsFeed={setNewsFeed} />}
                    {listStatus?.map((status: any, i: any) => {
                        const timeSinceCreation = (Date.now() - Date.parse(status.createdAt)) / 1000

                        const displayTime = config.timeDefault(timeSinceCreation)
                        if (listStatus.length === i + 1) {
                            return (
                                <div ref={lastStatusElementRef} key={i}>
                                    <Status timed={displayTime} status={status}>
                                        <h3 style={{ whiteSpace: 'pre-wrap' }}>{status.content}</h3>
                                        {status.img && <img className={cx('img')} src={status.img} alt="" />}
                                        {status.video && (
                                            <Video
                                                url={status.video}
                                                idVideo={status._id}
                                                volume={volume}
                                                setVolume={setVolume}
                                            />
                                        )}
                                    </Status>
                                </div>
                            )
                        } else {
                            return (
                                <div key={i}>
                                    <Status timed={displayTime} status={status}>
                                        <h3>{status.content}</h3>
                                        {status.img && <img className={cx('img')} src={status.img} alt="" />}
                                        {status.video && (
                                            <Video
                                                url={status.video}
                                                idVideo={status._id}
                                                volume={volume}
                                                setVolume={setVolume}
                                            />
                                        )}
                                    </Status>
                                </div>
                            )
                        }
                    })}
                </div>
            )}
            {error && (
                <Toast
                    title={'Warning'}
                    msg={'Chức năng hiện đang được cập nhật, vui lòng thử lại sau'}
                    toggle={setError}
                />
            )}
        </>
    )
}

export default Home
