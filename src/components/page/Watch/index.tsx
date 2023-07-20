import classNames from 'classnames/bind'

import styles from './Watch.module.scss'
import { useEffect, useState } from 'react'
import Status from '../../Item/Status'
import config from '../../../config'
import Video from '../../Item/Video'
import StatusSkeleton from '../../skeleton/Status'
import useJWT from '../../../config/useJWT'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

const Watch = () => {
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const userInfo = user?.userInfo
    const userRegister = user?.user
    const accessToken = user?.accessToken
    const [video, setVideo] = useState<any>(null)
    const [loading, setLoading] = useState<any>(false)
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
    useEffect(() => {
        const getVideo = async () => {
            try {
                setLoading(true)
                const res = await axiosJWT.get('/status/getstatusbyvideo', {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setVideo(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        if (accessToken) getVideo()
    }, [accessToken])
    if (!userInfo || userRegister) {
        return <div></div>
    }
    return (
        <>
            {loading ? (
                <StatusSkeleton />
            ) : (
                <div className={cx('wrapper')}>
                    {video?.map((v: any, i: any) => {
                        const timeSinceCreation = (Date.now() - Date.parse(v.createdAt)) / 1000

                        const displayTime = config.timeDefault(timeSinceCreation)
                        return (
                            <Status key={i} timed={displayTime} status={v}>
                                <h3>{v.content}</h3>
                                <Video url={v.video} idVideo={v._id} volume={volume} setVolume={setVolume} />
                            </Status>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Watch
