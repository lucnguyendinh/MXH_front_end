import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './NewFeed.module.scss'
import axios from 'axios'
import Status from '../../Item/Status'
import config from '../../../config'
import Video from '../../Item/Video'
import StatusSkeleton from '../../skeleton/Status'

const cx = classNames.bind(styles)

const NewFeed = () => {
    const [status, setStatus] = useState<any>(null)
    const [loading, setLoading] = useState<any>(false)
    useEffect(() => {
        try {
            const getStatus = async () => {
                setLoading(true)
                const res = await axios.get('/status/getnewfeed')
                setStatus(res.data)
                setLoading(false)
            }
            getStatus()
        } catch (err) {}
    }, [])
    return (
        <>
            {loading ? (
                <StatusSkeleton />
            ) : (
                <div className={cx('wrapper')}>
                    {status?.map((s: any, i: any) => {
                        const timeSinceCreation = (Date.now() - Date.parse(s.createdAt)) / 1000

                        const displayTime = config.timeDefault(timeSinceCreation)
                        return (
                            <Status key={i} timed={displayTime} status={s}>
                                <h3>{s.content}</h3>
                                {s.img && <img className={cx('img')} src={s.img} alt="" />}

                                {s.video && <Video url={s.video} />}
                            </Status>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default NewFeed
