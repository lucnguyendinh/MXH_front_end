import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './NewFeed.module.scss'
import Status from '../../Item/Status'
import config from '../../../config'
import Video from '../../Item/Video'
import StatusSkeleton from '../../skeleton/Status'
import useJWT from '../../../config/useJWT'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)

const NewFeed = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const accessToken = user?.accessToken
    const [status, setStatus] = useState<any>(null)
    const [loading, setLoading] = useState<any>(false)
    const axiosJWT = useJWT()
    useEffect(() => {
        const getStatus = async () => {
            try {
                setLoading(true)
                const res = await axiosJWT.get('/status/getnewfeed', {
                    headers: { token: `Bearer ${accessToken}` },
                })
                setStatus(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getStatus()
    }, [accessToken])
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
