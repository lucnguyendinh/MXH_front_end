import classNames from 'classnames/bind'

import styles from './Watch.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Status from '../../Item/Status'
import config from '../../../config'
import Video from '../../Item/Video'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import StatusSkeleton from '../../skeleton/Status'

const cx = classNames.bind(styles)

const Watch = () => {
    const [video, setVideo] = useState<any>(null)
    const [loading, setLoading] = useState<any>(false)
    useEffect(() => {
        try {
            const getVideo = async () => {
                setLoading(true)
                const res = await axios.get('/status/getstatusbyvideo')
                setVideo(res.data)
                setLoading(false)
            }
            getVideo()
        } catch (err) {}
    }, [])
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
                                <Video url={v.video} />
                            </Status>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Watch
